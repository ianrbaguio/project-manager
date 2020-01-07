pipeline{
    agent any

    stages{
        stage('Build'){
            steps{
                sh """sudo npm install
                      sudo npm run build"""

            }
        }
        stage('Test'){
            steps{
                sh "echo 'Testing...'"
            }
        }
        stage('Deploy'){
            steps{
                sh "echo 'Deploying...'"
            }
        }
    }
}
