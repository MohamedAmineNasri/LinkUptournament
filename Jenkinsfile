pipeline {
    agent any

    stages {
        stage('mouving to back_end') {
            steps {
                script {
                    sh 'cd BackEnd'
                   
                }
            }
        }

        stage('Install dependencies') {
steps{
script {
sh('npm install')
}
}
}


        
stage('Build application') {
steps{
script {
sh('npm start')
}


      
    }
}}}
