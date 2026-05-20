-- CreateTable
CREATE TABLE "CourseAssign" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "sectionId" TEXT,
    "teacherId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseAssign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassSlot" (
    "id" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CourseAssign_courseId_idx" ON "CourseAssign"("courseId");

-- CreateIndex
CREATE INDEX "CourseAssign_classId_idx" ON "CourseAssign"("classId");

-- CreateIndex
CREATE INDEX "CourseAssign_sectionId_idx" ON "CourseAssign"("sectionId");

-- CreateIndex
CREATE INDEX "CourseAssign_teacherId_idx" ON "CourseAssign"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseAssign_courseId_classId_sectionId_teacherId_key" ON "CourseAssign"("courseId", "classId", "sectionId", "teacherId");

-- AddForeignKey
ALTER TABLE "CourseAssign" ADD CONSTRAINT "CourseAssign_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseAssign" ADD CONSTRAINT "CourseAssign_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseAssign" ADD CONSTRAINT "CourseAssign_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseAssign" ADD CONSTRAINT "CourseAssign_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
