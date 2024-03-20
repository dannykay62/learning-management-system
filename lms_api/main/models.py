from django.db import models

# Instructor Model
class Teacher(models.Model):
    full_name = models.CharField(max_length=120)
    email = models.EmailField(max_length=120)
    password = models.CharField(max_length=120)
    qualification = models.CharField(max_length=120)
    phone = models.CharField(max_length=30)
    address = models.TextField()

    class Meta:
        verbose_name_plural = "1. Teachers"


# Course Category Model
class CourseCategory(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "2. Course Categories"


# Course model
class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "3. Courses"


# Student model
class Student(models.Model):
    full_name = models.CharField(max_length=120)
    email = models.EmailField(max_length=120)
    password = models.CharField(max_length=120)
    qualification = models.CharField(max_length=120)
    phone = models.CharField(max_length=30)
    address = models.TextField()
    interested_categories = models.TextField()

    class Meta:
        verbose_name_plural = "4. Students"
