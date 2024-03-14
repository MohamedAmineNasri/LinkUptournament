pipeline {
    agent any

    stages {

        stage('Install dependencies') {
steps{
script {
     dir('BackEnd') {
                    sh 'npm install'
                }

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
        
    
      


        stage('Build application') {
steps{
script {
   dir('BackEnd') {  
sh('npm run build-dev')
   }   
}
}
}

     stage('Unit Test') {
steps{
script {
     dir('BackEnd') {
sh('npm test')
     }
}
}
        } 
    
    
    
    
    }}

