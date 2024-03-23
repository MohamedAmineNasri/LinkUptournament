pipeline {
    agent any

    stages {

<<<<<<< HEAD
        stage('Install dependencies') {
steps{
script {
     dir('BackEnd') {
                    sh 'npm install'
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

     
    
    
    
    
    }}

=======
        stage('mouving to back_end') {
            steps {
                script {
                    echo "mouving to backend "
                    sh 'cd BackEnd'
                   

                }
            }
            
              
        }

        

      
    }
}
>>>>>>> safa
