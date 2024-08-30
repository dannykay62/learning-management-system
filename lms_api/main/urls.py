from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Teacher
    path('teachers/', views.TeacherList.as_view()),
    path('teachers/<int:pk>/', views.TeacherDetail.as_view()),
    path('teacher-update/<int:pk>/', views.TeacherDetailUpdate.as_view()),
    path('teacher-login/', views.teacher_login),
    path('teacher/change-password/<int:teacher_id>/', views.teacher_change_password),
    path('teacher/dashboard/<int:pk>/', views.TeacherDashboard.as_view()),

    # Category
    path('categories/', views.CategoryList.as_view()),
    # Course
    path('courses/', views.CourseList.as_view()),
    # Specific course chapters
    path('course-chapters/<int:course_id>/', views.CourseChapterList.as_view()),

    # chapter
    path('chapter/<int:pk>/', views.ChapterDetails.as_view()),

    # Chapter
    path('chapter/', views.ChapterList.as_view()),
    # Teacher Courses
    path('teacher-courses/<int:teacher_id>/', views.TeacherCourseList.as_view()),
    # Course detail
    path('teacher-course-detail/<int:pk>/', views.TeacherCourseDetail.as_view()),

    # Student
    path('student/', views.StudentList.as_view()),
    path('student-login/', views.student_login),
    path('student-enroll-course/', views.StudentEnrollCourseList.as_view()),
    path('fetch-enroll-status/<int:student_id>/<int:course_id>', views.fetch_enroll_status),
    path('fetch-enrolled-students/<int:course_id>/', views.EnrolledStudentsList.as_view()),
    path('fetch-all-enrolled-students/<int:teacher_id>/', views.EnrolledStudentsList.as_view()),
    # Fetch courses that a student is enrolled in
    path('fetch-enrolled-courses/<int:student_id>/', views.EnrolledStudentsList.as_view()),
    path('fetch-recommended-courses/<int:studentId>/', views.EnrolledStudentsList.as_view()),
    path('course-rating/<int:course_id>/', views.CourseRatingList.as_view()),
    path('fetch-rating-status/<int:student_id>/<int:course_id>', views.fetch_rating_status),


]