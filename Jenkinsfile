pipeline{
    agent any

    stages{
        stage('Build'){
            steps{
                sh """npm install
                      npm run build"""

            }
        }
        stage('Test'){
            steps{
                sh "echo 'Testing...'"
            }
        }
        stage('Deploy'){
            steps{
                sh """
                rm -rf /var/www/project-manager/build/*
                cp -a /build/. /var/www/project-manager/build/"""
            }
        }
    }
}
