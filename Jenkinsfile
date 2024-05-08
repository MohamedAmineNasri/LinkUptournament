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
        
        // stage('Node Clean') {  
        //     steps {
        //         echo 'Cleaning node_modules...'
        //         sh 'rm -rf FrontEnd/node_modules || true'
        //     }
        // }
          stage('Node Clean Frontend') {  
            steps {
                echo 'Cleaning Frontend node_modules...'
                sh 'rm -rf FrontEnd/node_modules || true'
            }
        }
        
        
        // stage('Install dependencies') {
        //     steps {
        //         script {
        //             sh 'cd FrontEnd && npm install --force'
        //         }
        //     }
        // }
           stage('Install Frontend dependencies') {
            steps {
                script {
                    sh 'cd FrontEnd && npm install --force'
                }
            }
        }

        // stage('Build application') {
        //     steps {
        //         script {
        //             sh 'cd FrontEnd && npm install --force && npm run build'
        //         }
        //     }
        // }
           stage('Build Frontend application') {
            steps {
                script {
                    sh 'cd FrontEnd && npm install --force && npm run build'
                }
            }
        }
          stage('Node Clean Backend') {  
            steps {
                echo 'Cleaning Backend node_modules...'
                sh 'rm -rf BackEnd/node_modules || true'
            }
        }
        
        stage('Install Backend dependencies') {
            steps {
                script {
                    sh 'cd BackEnd && npm install --force'
                }
            }
        }

        stage('Build Backend application') {
            steps {
                script {
                    sh 'cd BackEnd && npm install --force && npm run build'
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

         stage('pushing to docker hub') {
            steps {
                script {
                    sh('docker login -u nasriamine -p 25059373Hadil')
                    sh('docker tag sha256:2c152968a7476243aed1fd1423ab9fb9d19d3badb200157c61de47507ded8d27 nasriamine/linkuptournament:latest')
                    sh('docker push nasriamine/linkuptournament:latest')
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
