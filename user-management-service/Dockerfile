FROM openjdk:21-jdk-slim

WORKDIR /app

COPY target/user-management-service-0.0.1-SNAPSHOT.jar /app/user-management-service.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","user-management-service.jar"]
