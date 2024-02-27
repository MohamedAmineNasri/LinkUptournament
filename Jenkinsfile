pipeline {
    agent any

    stages {
        stage('Clean') {  steps {
                script {
                    sh 'cd BackEnd'
                }
            }
            steps {
                script {
                    sh 'npm i '
                }
            }
              steps {
                script {
                    sh 'npm start'
                }
            }
        }

      
    }
}
