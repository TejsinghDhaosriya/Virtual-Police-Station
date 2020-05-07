var firstname = prompt("What is your first name");
var lastname =prompt("What is your last name");
if (window.confirm('Really go to another page?'))
{
    alert('message');
    window.location = '/some/url';
}
else
{
    die();
}
document.getElementById("myBtn").onclick=function(){
    alert("review your answer");
    window.location= "index.php";
};