import React from 'react';
import { Skeleton } from '../../ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card';

const ViewProfileOrganizationSkeleton = () => {
    return (
        <div className="w-4/5 mx-auto p-6 mobile:p-10">
      <div className="grid grid-cols-1 gap-8">
        <div>
          <div className="flex items-center gap-4">
            <div className="rounded-md p-3 flex items-center justify-center">
            <Skeleton className="w-12 h-12 rounded-full" />
            </div>
            <Skeleton className="w-32 h-8" />
          </div>
          <Skeleton className="mt-4 h-4 w-full" />
          <Skeleton className="mt-4 h-4 w-full" />
          <Skeleton className="mt-4 h-4 w-full" />
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="mt-2 h-4 w-32" />
            </div>
            <div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="mt-2 h-4 w-32" />
            </div>
            <div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="mt-2 h-4 w-32" />
            </div>
            <div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="mt-2 h-4 w-32" />
            </div>
            <div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="mt-2 h-4 w-32" />
            </div>
            <div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="mt-2 h-4 w-32" />
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div>
              <Skeleton className="h-6 w-24" />
              <Skeleton className="mt-2 h-4 w-20" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="mt-2 h-4 w-32" />
            </div>
            <div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="mt-2 h-4 w-32" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Skeleton className="h-8 w-32" />
        <div className="mt-4 grid grid-cols-1 mobile:grid-cols-2 laptop:grid-cols-3 gap-4">
          <Card className="p-4">
            <CardHeader>
              <Skeleton className="h-6 w-24" />
              <Skeleton className="mt-2 h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-20" />
            </CardFooter>
          </Card>
          <Card className="p-4">
            <CardHeader>
              <Skeleton className="h-6 w-24" />
              <Skeleton className="mt-2 h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-20" />
            </CardFooter>
          </Card>
          <Card className="p-4">
            <CardHeader>
              <Skeleton className="h-6 w-24" />
              <Skeleton className="mt-2 h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-20" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
    );
};

export default ViewProfileOrganizationSkeleton;