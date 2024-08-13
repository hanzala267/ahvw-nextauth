-- CreateTable
CREATE TABLE "EmployeeHours" (
    "id" SERIAL NOT NULL,
    "employeeId" TEXT NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeeHours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeHours_employeeId_serviceId_key" ON "EmployeeHours"("employeeId", "serviceId");

-- AddForeignKey
ALTER TABLE "EmployeeHours" ADD CONSTRAINT "EmployeeHours_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeHours" ADD CONSTRAINT "EmployeeHours_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
