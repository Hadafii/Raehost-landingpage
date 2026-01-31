// app/api/newsletter/route.ts
import type { RowDataPacket } from "mysql2";

import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import DOMPurify from "isomorphic-dompurify";

import { logger } from "@/lib/logs";
import { db } from "@/lib/db";

interface NewsletterRow extends RowDataPacket {
  id: number;
  user_id: number | null;
  email: string;
  is_subscribed: boolean;
}

interface UserRow extends RowDataPacket {
  id: number;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    // Validate Content-Type
    const contentType = request.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type harus application/json" },
        { status: 400 },
      );
    }

    // Parse and validate body size
    const rawBody = await request.text();

    if (rawBody.length > 1024) {
      // Max 1KB untuk newsletter request
      return NextResponse.json(
        { error: "Request terlalu besar" },
        { status: 413 },
      );
    }

    let body;

    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: "Format JSON tidak valid" },
        { status: 400 },
      );
    }

    const { email } = body;

    // Input validation and sanitization
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email diperlukan dan harus berupa string" },
        { status: 400 },
      );
    }

    // Sanitize input dari XSS
    const sanitizedEmail = DOMPurify.sanitize(email.trim());

    // Validate email format dengan validator yang lebih ketat
    if (!validator.isEmail(sanitizedEmail) || sanitizedEmail.length > 150) {
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 },
      );
    }

    // Additional email validation - no dangerous characters
    const dangerousChars = /[<>'"\\;(){}[\]]/;

    if (dangerousChars.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Email mengandung karakter yang tidak diizinkan" },
        { status: 400 },
      );
    }

    // Normalize email (lowercase)
    const normalizedEmail =
      validator.normalizeEmail(sanitizedEmail, {
        gmail_lowercase: true,
        gmail_remove_dots: false,
        outlookdotcom_lowercase: true,
        yahoo_lowercase: true,
        icloud_lowercase: true,
      }) || sanitizedEmail.toLowerCase();

    // Rate limiting check (simple implementation)
    const userIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check if email already exists in newsletters table
    // Using parameterized queries untuk prevent SQL injection
    const [existingNewsletter] = await db.execute<NewsletterRow[]>(
      `SELECT id, user_id, email, is_subscribed FROM newsletters WHERE email = ? LIMIT 1`,
      [normalizedEmail],
    );

    if (existingNewsletter.length > 0) {
      const newsletter = existingNewsletter[0];

      if (newsletter.is_subscribed) {
        return NextResponse.json(
          { message: "Email sudah terdaftar di newsletter kami" },
          { status: 409 },
        );
      } else {
        // Reactivate subscription - using parameterized query
        await db.execute(
          `UPDATE newsletters SET is_subscribed = 1, updated_at = CURRENT_TIMESTAMP WHERE email = ? LIMIT 1`,
          [normalizedEmail],
        );

        return NextResponse.json({
          message: "Berhasil mengaktifkan kembali subscription newsletter!",
        });
      }
    }

    // Check if email exists in users table - using parameterized query
    const [existingUser] = await db.execute<UserRow[]>(
      `SELECT id, email FROM users WHERE email = ? LIMIT 1`,
      [normalizedEmail],
    );

    let userId = null;

    if (existingUser.length > 0) {
      userId = existingUser[0].id;
    }

    // Insert new newsletter subscription - using parameterized query
    await db.execute(
      `INSERT INTO newsletters (user_id, email, is_subscribed, created_at, updated_at) 
       VALUES (?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [userId, normalizedEmail],
    );

    return NextResponse.json(
      {
        message:
          "Berhasil mendaftar newsletter! Terima kasih sudah bergabung dengan kami.",
      },
      { status: 201 },
    );
  } catch (err) {
    logger.error("Newsletter API error:", err);

    // Handle duplicate email error (just in case)
    if (err instanceof Error && err.message.includes("Duplicate entry")) {
      return NextResponse.json(
        { error: "Email sudah terdaftar di newsletter kami" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Terjadi kesalahan server. Silakan coba lagi nanti." },
      { status: 500 },
    );
  }
}

// Optional: GET method to check subscription status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email parameter diperlukan" },
        { status: 400 },
      );
    }

    // Sanitize and validate email
    const sanitizedEmail = DOMPurify.sanitize(email.trim());

    if (!validator.isEmail(sanitizedEmail) || sanitizedEmail.length > 150) {
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 },
      );
    }

    const normalizedEmail =
      validator.normalizeEmail(sanitizedEmail) || sanitizedEmail.toLowerCase();

    // Using parameterized query
    const [rows] = await db.execute<NewsletterRow[]>(
      `SELECT email, is_subscribed FROM newsletters WHERE email = ? LIMIT 1`,
      [normalizedEmail],
    );

    if (rows.length === 0) {
      return NextResponse.json({ subscribed: false });
    }

    return NextResponse.json({
      subscribed: rows[0].is_subscribed,
    });
  } catch (err) {
    logger.error("Newsletter check API error:", err);

    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
