/**
 * Admin: Upload / manage interior progress for customer projects.
 * Data reflects in customer app under "My Interiors Progress".
 * Reuses Custom Builder list → select customer → Work Progress (DayProgress) flow.
 */
import AccessDenied from "@/src/common/AccessDenied";
import withAdminLayout from "@/src/common/AdminLayout";
import CustomBuilderSteps from "@/src/features/CustomBuilder/BuilderMultiStep";
import { usePermissionStore } from "@/src/stores/usePermissions";
import { SEO } from "@/src/common/SEO";
import React from "react";

const InteriorProgressPage = () => {
  const { hasPermission, isLoading, initialized } = usePermissionStore((state) => state);
  if (isLoading && !initialized) return null;
  const hasAccess = hasPermission("custom_builder", "view");

  return (
    <>
      <SEO
        title="Interior Progress | Houznext Admin"
        description="Upload and manage interior project progress. Updates reflect in customer My Interiors Progress."
        keywords="Interior progress, upload progress, Houznext Admin"
      />
      {hasAccess ? (
        <div className="w-full md:p-5 p-3">
          <h1 className="text-xl font-bold text-slate-900 mb-4">Interior Progress</h1>
          <p className="text-slate-600 mb-6">
            Select a customer project to upload or update progress. Changes will appear in the customer&apos;s &quot;My Interiors Progress&quot; view.
          </p>
          <CustomBuilderSteps />
        </div>
      ) : (
        <AccessDenied resource="Interior Progress" />
      )}
    </>
  );
};

export default withAdminLayout(InteriorProgressPage);
