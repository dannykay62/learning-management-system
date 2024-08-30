from rest_framework import serializers
from . import models
from .models import Course, Student

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['id',
                  'full_name',
                  'profile_img',
                  'email',
                  'password',
                  'qualification',
                  'phone',
                  'skills',
                  'teacher_courses',
                  'skill_list',
                  ]
        # depth=1

    def __init__(self, *args, **kwargs):
        super(TeacherSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1


class TeacherUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['id',
                  'full_name',
                  'profile_img',
                  'email',
                  'qualification',
                  'phone',
                  'skills',
                  'teacher_courses',
                  'skill_list',
                  ]
        # depth=1

    def __init__(self, *args, **kwargs):
        super(TeacherUpdateSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1


class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Teacher
        fields=['total_teacher_courses', 'total_teacher_chapter', 'total_teacher_students']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields = ['id', 'title', 'description']


# Course Serializer
class CourseSerializer(serializers.ModelSerializer):
    # teacher = serializers.PrimaryKeyRelatedField(queryset=models.Teacher.objects.all())
    # teacher = TeacherSerializer()
    # tech_list = serializers.SerializerMethodField()

    class Meta:
        model = models.Course
        fields = ['id',
                  'category',
                  'teacher',
                  'title',
                  'description',
                  'featured_img',
                  'technologies',
                  'course_chapters',
                  'related_videos',
                  'tech_list',
                  'total_enrolled_students',
                  'course_rating',]
        # depth=1

    # def get_tech_list(self, obj):
    #     return obj.tech_list()

    # def create(self,validated_data):
    #     teacher = validated_data.get('teacher')
    #     # student = validated_data.get('student')
    #     print(f"Validated Data: {validated_data}")
    #     print(f"Validated Data: {teacher}")
    #     # if not course or not student:
    #     #     raise serializers.ValidationError("Course and student are required")
    #     # return StudentCourseEnrolment.object.create(**validated_data)
    #     # print(f"Validated Data: {validated_data}")
    #     return super().create(validated_data)

    def __init__(self, *args, **kwargs):
        super(CourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

# Reference: 51. Django ReactJs LMS #51_Course rating System_Enroll Student can rate course_DRF depth with post data - 32:30 minutes
class CreateCourseSerializer(serializers.ModelSerializer):
    teacher = serializers.PrimaryKeyRelatedField(queryset=models.Teacher.objects.all())
    tech_list = serializers.SerializerMethodField()

    class Meta:
        model = models.Course
        fields = ['id', 'category', 'teacher', 'title', 'description',
                  'featured_img', 'technologies', 'course_chapters',
                  'related_videos', 'tech_list','total_enrolled_students']

    def __init__(self, *args, **kwargs):
        super(CreateCourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

    def get_tech_list(self, obj):
        return obj.tech_list()

    def create(self,validated_data):
        teacher = validated_data.get('teacher')
        # student = validated_data.get('student')
        # print(f"Validated Data: {validated_data}")
        # print(f"Validated Data: {teacher}")
        # if not course or not student:
        #     raise serializers.ValidationError("Course and student are required")
        # return StudentCourseEnrolment.object.create(**validated_data)
        # print(f"Validated Data: {validated_data}")
        return super().create(validated_data)



class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields = ['id', 'course', 'title', 'description', 'video', 'remarks']


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ['id', 'full_name', 'email', 'password', 'username', 'interested_categories']


class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    # course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    # student = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all())

    class Meta:
        model = models.StudentCourseEnrolment
        fields = ['id', 'course', 'student','enrolled_time']
        # depth=1

    def __init__(self, *args, **kwargs):
        super(StudentCourseEnrollSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

    
    def create(self,validated_data):
        # course = validated_data.get('course')
        # student = validated_data.get('student')
        # print(f"Validated Data: {validated_data}")
        # print(f"Validated Data: {course}{student}")
        # if not course or not student:
        #     raise serializers.ValidationError("Course and student are required")
        # return StudentCourseEnrolment.object.create(**validated_data)
        # print(f"Validated Data: {validated_data}")
        return super().create(validated_data)


class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseRating
        fields = ['id', 'course', 'student','rating', 'review', 'review_time']
        # depth=1

    def __ini__(self, *args, **kwargs):
        super(CourseRatingSerializer, self).__init(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1