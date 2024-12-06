-- CreateTable
CREATE TABLE "Employee" (
    "employeeID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employeeID")
);

-- CreateTable
CREATE TABLE "Pharmacist" (
    "licenseNumber" TEXT NOT NULL,
    "employeeID" TEXT NOT NULL,

    CONSTRAINT "Pharmacist_pkey" PRIMARY KEY ("licenseNumber")
);

-- CreateTable
CREATE TABLE "Product" (
    "productID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productID")
);

-- CreateTable
CREATE TABLE "Quantity" (
    "productID" TEXT NOT NULL,
    "quantityNumber" INTEGER NOT NULL,

    CONSTRAINT "Quantity_pkey" PRIMARY KEY ("productID","quantityNumber")
);

-- CreateTable
CREATE TABLE "SalesTransaction" (
    "transactionID" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "paymentInfo" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reportID" TEXT,

    CONSTRAINT "SalesTransaction_pkey" PRIMARY KEY ("transactionID")
);

-- CreateTable
CREATE TABLE "Report" (
    "reportID" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("reportID")
);

-- CreateTable
CREATE TABLE "Accountant" (
    "employeeID" TEXT NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Accountant_pkey" PRIMARY KEY ("employeeID")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentID" TEXT NOT NULL,
    "paymentType" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentID")
);

-- CreateTable
CREATE TABLE "MedicineType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MedicineType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicine" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "instruction" TEXT,
    "sideEffect" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PaymentToSalesTransaction" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PaymentToSalesTransaction_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicineType_name_key" ON "MedicineType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Medicine_number_key" ON "Medicine"("number");

-- CreateIndex
CREATE INDEX "_PaymentToSalesTransaction_B_index" ON "_PaymentToSalesTransaction"("B");

-- AddForeignKey
ALTER TABLE "Pharmacist" ADD CONSTRAINT "Pharmacist_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("employeeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quantity" ADD CONSTRAINT "Quantity_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("productID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesTransaction" ADD CONSTRAINT "SalesTransaction_reportID_fkey" FOREIGN KEY ("reportID") REFERENCES "Report"("reportID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "MedicineType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentToSalesTransaction" ADD CONSTRAINT "_PaymentToSalesTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "Payment"("paymentID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentToSalesTransaction" ADD CONSTRAINT "_PaymentToSalesTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "SalesTransaction"("transactionID") ON DELETE CASCADE ON UPDATE CASCADE;
