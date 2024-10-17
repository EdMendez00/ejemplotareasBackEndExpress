pipeline {
    agent any
    tools {nodejs "node12"}
    stages{
        stage("Build"){
            steps{
                echo "===== Executing Build ====="
                sh 'node -v'
                sh "npm install"
            }
        }
        steps("Test"){
            steps{
                echo "===== Executing test ====="
                sh "npm test"
            }
        }
    }
    post {
        always {
            echo "===== Always ====="
        }
        success {
            echo "===== Pipeline Execution Successfuly ====="
        }
        failure {
            echo "===== Pipeline ExecutionFailed ====="
        }
    }
}
