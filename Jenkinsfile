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

