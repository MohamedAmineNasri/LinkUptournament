pipeline {
    agent any

    // environment {
    //     registryCredentials = "nexus"
    //     registry = "192.168.1.197:8083"
    // }
    
    stages {
        stage('git pull') {
            steps {
                script {
                    sh 'git pull origin main'
                }
            }
        }
        
        stage('Install dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'scanner'
                    withSonarQubeEnv {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        // stage('Building images') {
        //     steps {
        //         script {
        //             sh 'docker-compose build'
        //         }
        //     }
        // }
// stage('Docker compose') {
//             steps {
//                 script {
//                     sh 'docker-compose up -d'
//                 }
//             }
//         }
        // stage('Deploy to Nexus') {
        //     steps {
        //         script {
        //             docker.withRegistry("http://${registry}", registryCredentials) {
        //                 sh "docker push $registry/reactapp:1.0.0"
        //             }
        //         }
        //     }
        // }

        // stage('Run application') {
        //     steps {  
        //         script {
        //             docker.withRegistry("http://${registry}", registryCredentials) {
        //                 sh 'docker run -d -p 5173:5173 $registry/reactapp:1.0.0'
        //             }
        //         }
        //     }
        // }
    }
}
