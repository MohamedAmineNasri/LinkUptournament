pipeline {
    agent any

    // environment {
    //     // Define environment variables if needed
    // }

    stages {
        stage('Build') {
            steps {
                // Install dependencies and build React app
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                // Run tests
                sh 'npm test'
            }
        }
        stage('Code Analysis') {
            steps {
                // Run SonarQube analysis
                withSonarQubeEnv('SonarQube_Server') {
                    sh 'npm install -g sonarqube-scanner'
                    sh 'sonar-scanner'
                }
            }
        }
        stage('Deploy') {
            steps {
                // Add your deployment script here
                // For example, deploying to a web server
                // sh 'scp -r build/* user@server:/var/www/html'
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! Ready for deployment.'
            // You can trigger deployment here if needed
        }
        failure {
            echo 'Pipeline failed! Please check the build logs.'
            // You can send notifications or take other actions on failure
        }
    }
}
