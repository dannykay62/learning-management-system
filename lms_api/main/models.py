from django.db import models
from django.core import serializers
from django.db.models import Q

# Teacher Model
class Teacher(models.Model):
    full_name = models.CharField(max_length=120)
    email = models.EmailField(max_length=120, unique=True)
    password = models.CharField(max_length=120)
    qualification = models.CharField(max_length=120)
    phone = models.CharField(max_length=30)
    profile_img = models.ImageField(upload_to='teacher_profile_imgs',null=True)
    skills = models.TextField()

    class Meta:
        verbose_name_plural = "1. Teachers"

    def __str__(self):
        return f"{self.id}. {self.full_name}"
    
    def skill_list(self):
        skill_list = self.skills.split(',')
        return skill_list
    
    # Total teacher courses
    def total_teacher_courses(self):
        total_courses = Course.objects.filter(teacher=self).count()
        return total_courses
    
    # Total teacher chapter
    def total_teacher_chapter(self):
        total_chapters = Chapter.objects.filter(course__teacher=self).count()
        return total_chapters
    
    # Total teacher students
    def total_teacher_students(self):
        total_students = StudentCourseEnrolment.objects.filter(course__teacher=self).count()
        return total_students


# Course Category Model
class CourseCategory(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "2. Course Categories"

    def __str__(self):
        return self.title


# Explicitly set upload path and filename
def upload_to(instance, filename):
    return 'course_imgs/{filename}'.format(filename=filename)

# Course model
class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE,related_name='teacher_courses')
    title = models.CharField(max_length=200)
    description = models.TextField()
    featured_img = models.ImageField(upload_to='course_imgs/',null=True)
    technologies = models.TextField(null=True)

    class Meta:
        verbose_name_plural = "3. Courses"

 
    def related_videos(self):
        if self.technologies:
            related_videos = Course.objects.filter(technologies__icontains=self.technologies).exclude(id=self.id)
        else:
            related_videos = Course.objects.none()
        return serializers.serialize('json',related_videos)

    def __str__(self):
        return self.title
    
    def tech_list(self):
        if self.technologies:
            return self.technologies.split(',')
        return []
    
    def total_enrolled_students(self):
        total_enrolled_students = StudentCourseEnrolment.objects.filter(course=self).count()
        return total_enrolled_students
    
    def course_rating(self):
        course_rating = CourseRating.objects.filter(course=self).aggregate(avg_rating=models.Avg('rating'))
        return course_rating['avg_rating']



# Chapter Model
class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE,related_name='course_chapters')
    title = models.CharField(max_length=200)
    description = models.TextField()
    video = models.FileField(upload_to='chapter_videos/', null=True)
    remarks = models.TextField(default='Chapter remarks/details')

    class Meta:
        verbose_name_plural = "4. Chapters"

    def __str__(self):
        return self.title


# Student model
class Student(models.Model):
    full_name = models.CharField(max_length=120)
    email = models.EmailField(max_length=120, unique=True)
    password = models.CharField(max_length=120)
    username = models.CharField(max_length=120)
    interested_categories = models.TextField()

    class Meta:
        verbose_name_plural = "5. Students"

    def __str__(self):
        return self.full_name

# Student Course Enrolment
class StudentCourseEnrolment(models.Model):
    course=models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrolled_courses')
    student=models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrolled_student')
    enrolled_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "6. Enrolled Courses"
        ordering = ['enrolled_time']

    def __str__(self):
        return f"{self.course}-{self.student} - {self.enrolled_time}"
  

# Course rating and reviews
class CourseRating(models.Model):
    course=models.ForeignKey(Course, on_delete=models.CASCADE)
    student=models.ForeignKey(Student, on_delete=models.CASCADE)
    rating=models.PositiveIntegerField(default=0)
    review=models.TextField(null=True)
    review_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "7. Courses Rating and Review"

    def __str__(self):
        return f"{self.course} - {self.student} : {self.rating} - {self.review}"

