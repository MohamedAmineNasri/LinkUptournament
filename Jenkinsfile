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
        
        stage('Node Clean') {  
            steps {
                echo 'Cleaning node_modules...'
                sh 'rm -rf node_modules || true'
            }
        }
        
       stage('Install dependencies') {
            steps {
                dir('./FrontEnd') { 
                    script {
                        sh 'npm install'
                    }
                }
            }
        }

        
          stage('Build application') {
            steps {
                dir('./FrontEnd/package.json') {
                    script {
                        sh 'npm install' 
                        sh 'npm run build'
                    }
                }
            }
        }



        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'scanner'
                    withSonarQubeEnv {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=sqa_5444804b2043f69829ce7f929dd7578cbf0e8ed5 -Dsonar.projectName=LinkUptournament"
                    }
                }
            }
        }

        stage('Building image') {
           steps {
               script {
                   sh('docker-compose build')
               }
           }
        }

        // Additional stages can be added here...

        // stage('Docker compose') {
        //     steps {
        //         script {
        //             sh 'docker-compose up -d'
        //         }
        //     }
        // }
        
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
