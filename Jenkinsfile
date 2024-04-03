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
             
    
      


        stage('Build application') {
steps{
script {
   dir('BackEnd') {  
sh('npm run build-dev')
   }   
}
}
}
        stage('Building images (node and mongo)') {
steps{
script {
    dir('BackEnd') {
sh('docker-compose build')
}
}
}
        }
     
    
    
    
    
    }}

       

        

    
