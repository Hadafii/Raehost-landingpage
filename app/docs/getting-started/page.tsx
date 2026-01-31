"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, Button, Spinner, Chip } from "@heroui/react";
import { Wrench, Home, ArrowLeft } from "lucide-react";

const DevelopmentPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Auto redirect after 3 seconds if needed
    const timer = setTimeout(() => {
      router.push("/development");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardBody className="text-center p-8 space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="p-4 bg-warning/10 rounded-full">
              <Wrench className="w-12 h-12 text-warning" />
            </div>
          </div>

          {/* Status Chip */}
          <Chip className="mx-auto" color="warning" variant="flat">
            Under Development
          </Chip>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Page Under Construction
            </h1>
            <p className="text-default-500 text-sm">
              {`We're working hard to bring you this feature. Please check back
              soon!`}
            </p>
          </div>

          {/* Loading Indicator */}
          <div className="flex items-center justify-center gap-2 text-default-400">
            <Spinner color="warning" size="sm" />
            <span className="text-sm">Redirecting...</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              className="flex-1"
              color="default"
              startContent={<ArrowLeft className="w-4 h-4" />}
              variant="bordered"
              onPress={handleGoBack}
            >
              Go Back
            </Button>
            <Button
              className="flex-1"
              color="primary"
              startContent={<Home className="w-4 h-4" />}
              onPress={handleGoHome}
            >
              Home
            </Button>
          </div>

          {/* Footer Text */}
          <p className="text-xs text-default-400 pt-2">
            This page will be available soon
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default DevelopmentPage;
