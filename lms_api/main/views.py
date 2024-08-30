from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics,permissions,status
from .serializers import TeacherSerializer,CategorySerializer,CourseSerializer,ChapterSerializer,StudentSerializer,StudentCourseEnrollSerializer,CreateCourseSerializer,CourseRatingSerializer,TeacherUpdateSerializer,TeacherDashboardSerializer
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from . import models

class TeacherList(generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]

class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]

@csrf_exempt
def teacher_login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        teacherData = models.Teacher.objects.get(email=email, password=password)
    except models.Teacher.DoesNotExist:
        teacherData = None
    if teacherData:
        return JsonResponse({'bool':True, 'teacher_id':teacherData.id})
    else:
        return JsonResponse({'bool':False})
    

class TeacherDetailUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherUpdateSerializer
    # permission_classes = [permissions.IsAuthenticated]

class CategoryList(generics.ListCreateAPIView):
    queryset = models.CourseCategory.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = [permissions.IsAuthenticated]

# Course
class CourseList(generics.ListCreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CreateCourseSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        category_id = self.request.data.get('category')
        teacher_id = self.request.data.get('teacher')
        if category_id and teacher_id:
            try:
                category_instance = models.CourseCategory.objects.get(id=category_id)
                teacher_instance = models.Teacher.objects.get(id=teacher_id)
                serializer.save(category=category_instance, teacher=teacher_instance)
            except models.CourseCategory.DoesNotExist:
                return Response({'error': 'Invalid category ID'}, status=400)
            except models.Teacher.DoesNotExist:
                return Response({'error': 'Invalid teacher ID'}, staus=400)
        else:
            return Response({'error': 'Category and Teacher fields are required'}, status=400)
        
    def create(self, request, *args, **kwargs):
        # Debugging: log recieved data
        # print(f"Request Data: {request.data}")

        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
        except Exception as e:
            print(f"Error: {e}")
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_queryset(self):
        qs = super().get_queryset()
        if 'result' in self.request.GET:
            limit = int(self.request.GET['result'])
            qs = models.Course.objects.all().order_by('-id')[:limit]

        if 'category' in self.request.GET:
            category = self.request.GET['category']
            qs = models.Course.objects.filter(technologies__icontains=category)

        if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name = self.request.GET['skill_name']
            teacher = self.request.GET['teacher']
            teacher = models.Teacher.objects.filter(id=skill_name).first()
            qs = models.Course.objects.filter(technologies__icontains=skill_name)

        return qs


# Specific teacher courses
class TeacherCourseList(generics.ListCreateAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get(pk=teacher_id)
        return models.Course.objects.filter(teacher=teacher)


class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    lookup_fields = 'pk'

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Check if 'featured_image' is present in the request data
        if 'featured_img' not in request.data or request.data['featured_img'] == '':
            #  if not present, use the existing 'featured_img'value from the instance
            request.data['featured_img'] = instance.featured_img

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)
    

# Chapter List
class ChapterList(generics.ListCreateAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer


# Course Chapter
class CourseChapterList(generics.ListAPIView):
    serializer_class = ChapterSerializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = models.Course.objects.get(pk=course_id)
        return models.Chapter.objects.filter(course=course)


# Specific chapter
class ChapterDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer


# Student Data
class StudentList(generics.ListCreateAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    # permission_classes = [permissions.IsAuthenticated]


@csrf_exempt
def student_login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        studentData = models.Student.objects.get(email=email, password=password)
    except models.Student.DoesNotExist:
        studentData = None
    if studentData:
        return JsonResponse({'bool':True, 'student_id':studentData.id})
    else:
        return JsonResponse({'bool':False})
    

class StudentEnrollCourseList(generics.ListCreateAPIView):
    queryset = models.StudentCourseEnrolment.objects.all()
    serializer_class = StudentCourseEnrollSerializer

    # def get_queryset(self, serializer):
    #     course = self.kwargs['course']
    #     student = self.kwargs['student']
    #     course_id = self.kwargs['course_id']
    #     return serializer.save(course_id=course_id,course=course,student=student)
    def create(self, request, *args, **kwargs):
        # Debugging: log recieved data
        # print(f"Request Data: {request.data}")

        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
        except Exception as e:
            print(f"Error: {e}")
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


def fetch_enroll_status(request,student_id,course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    enrollStatus = models.StudentCourseEnrolment.objects.filter(course=course, student=student).count()
    if enrollStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})   

class EnrolledStudentsList(generics.ListAPIView):
    queryset = models.StudentCourseEnrolment.objects.all()
    serializer_class = StudentCourseEnrollSerializer

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = models.Course.objects.get(pk=course_id)
            return models.StudentCourseEnrolment.objects.filter(course=course)
        elif 'teacher_id' in self.kwargs:
            teacher_id = self.kwargs['teacher_id']
            teacher = models.Teacher.objects.get(pk=teacher_id)
            return models.StudentCourseEnrolment.objects.filter(course__teacher=teacher).distinct()
        elif 'student_id' in self.kwargs:
            student_id = self.kwargs['student_id']
            student = models.Student.objects.get(pk=student_id)
            return models.StudentCourseEnrolment.objects.filter(student=student).distinct()
        elif 'studentId' in self.kwargs:
            student_id = self.kwargs['studentId']
            student = models.Student.objects.get(pk=student_id)
            qs= models.Course.objects.filter(technologies__icontains=student.interested_categories)
            return qs


class CourseRatingList(generics.ListCreateAPIView):
    serializer_class = CourseRatingSerializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']

        course = models.Course.objects.get(pk=course_id)
        return models.CourseRating.objects.filter(course=course)


def fetch_rating_status(request,student_id,course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    ratingStatus = models.CourseRating.objects.filter(course=course, student=student).count()
    if ratingStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    

@csrf_exempt
def teacher_change_password(request,teacher_id):
    password = request.POST['password']
    try:
        teacherData = models.Teacher.objects.get(id=teacher_id)
    except models.Teacher.DoesNotExist:
        teacherData = None
    if teacherData:
        models.Teacher.objects.filter(id=teacher_id).update(password=password)
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    

class TeacherDashboard(generics.RetrieveAPIView):
    queryset=models.Teacher.objects.all()
    serializer_class=TeacherDashboardSerializer