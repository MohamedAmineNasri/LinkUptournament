pipeline {
    agent any

    stages {
        stage('git pull') {
            steps {
                script {
                    sh 'git pull origin main'
                }
            }
        }

        stage('Node Clean Frontend') {  
            steps {
                echo 'Cleaning Frontend node_modules...'
                sh 'rm -rf FrontEnd/node_modules || true'
            }
        }
        
        stage('Install Frontend dependencies') {
            steps {
                script {
                    sh 'cd FrontEnd && npm install --force'
                }
            }
        }

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
                    // Use the "build-dev" script to build your Backend application
                    sh 'cd BackEnd && npm install --force && npm run build-dev || true'
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
    }
}
