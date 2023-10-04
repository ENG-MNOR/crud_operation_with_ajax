<?php
header ("Content-type: application/json");
include 'conn.php';
$action=$_POST["action"];
//function of read all
function readAll($conn){
    $data=array();
    $message=array();
    $query="select * from student";
    $result=$conn->query($query);
    if($result){
        while($row=$result->fetch_assoc()){
            $data []=$row;
        }
        $message=array("status"=>"true","data"=>$data);
    }else{
        $message=array("status"=>false,"data"=>$conn->connect_error());
    }

    echo json_encode($message);
}
function readStudentInfo($conn){
    $data=array();
    $message=array();
    $id=$_POST['id'];
    $query="select * from student where id='$id'";
    $result=$conn->query($query);
    if($result){
        while($row=$result->fetch_assoc()){
            $data []=$row;
        }
        $message=array("status"=>"true","data"=>$data);
    }else{
        $message=array("status"=>false,"data"=>$conn->connect_error());
    }

    echo json_encode($message);
}
function registerStudent($conn){
    $message=array();
    // $data=array();
    $studentId=$_POST["id"];
    $studentName=$_POST["name"];
    $studentClass=$_POST["class"];
    $query="insert into student(id,name,class) values('$studentId','$studentName','$studentClass')";
    $result=$conn->query($query);
    if($result){
      $message=array("status"=>true,"data"=>"successfully Ragistered");
    }
    else{
        $message=array("status"=>false,"data"=>$conn->error);
    }
    echo json_encode($message);
}
function updateStudent($conn){
    $message=array();
    // $data=array();
    $studentId=$_POST["id"];
    $studentName=$_POST["name"];
    $studentClass=$_POST["class"];
    $query="update student set name='$studentName',class='$studentClass' where id='$studentId'";
    $result=$conn->query($query);
    if($result){
      $message=array("status"=>true,"data"=>"successfully updated");
    }
    else{
        $message=array("status"=>false,"data"=>$conn->error);
    }
    echo json_encode($message);
}

function deleteStudent($conn){
    $data=array();
    $message=array();
    $id=$_POST['id'];
    $query="delete from student where id='$id'";
    $result=$conn->query($query);
    if($result){
       
        $message=array("status"=>"true","data"=>"successfully deleted");
    }else{
        $message=array("status"=>false,"data"=>$conn->connect_error());
    }

    echo json_encode($message);
}

if($action){
    $action($conn);
}else{
    echo "action is required...😉";
}


?>