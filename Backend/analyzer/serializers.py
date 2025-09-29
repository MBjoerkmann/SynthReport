from rest_framework import serializers

class UrlSerializer(serializers.Serializer):
    url = serializers.URLField()

class ReportSerializer(serializers.Serializer):
    email = serializers.EmailField()
    analysis = serializers.JSONField()