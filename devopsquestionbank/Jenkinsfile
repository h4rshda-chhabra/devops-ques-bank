pipeline {
    agent any

    environment {
        // You can set environment variables here if needed
        COMPOSE_PROJECT_NAME = "devops-ques-bank"
    }

    stages {
        stage('Build & Deploy Containers') {
            steps {
                // This stops any running containers, rebuilds the images, and starts them up again in detached mode
                dir('devopsquestionbank') {
                    bat 'docker-compose -p devops-ques-bank down'
                    bat 'docker-compose -p devops-ques-bank up --build -d'
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                // Quick check to see if containers are up and running
                bat 'docker ps | findstr devops-ques-bank'
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
        }
        success {
            echo 'Deployment was successful! Your app is now running.'
        }
        failure {
            echo 'Deployment failed! Check the Jenkins console output for errors.'
        }
    }
}
