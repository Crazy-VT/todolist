window.addEventListener('load',function () {
    let tab=document.querySelectorAll(".tab>li");
    let content=document.querySelector(".content");
    let type;
    let arr=[
        {id:1,content:"端午过后交作业",time:"2019/06/04",status:false},
        {id:2,content:"个人博客完成情况",time:"2019/05/31",status:true},
        {id:3,content:"实训完成进度",time:"2019/10/?",status:false},
        {id:4,content:"需求完成进度",time:"2019/06/10",status:false},
    ];
    let prev=0;
    //点击事件
    for(let i=0;i<tab.length;i++){
        tab[i].onclick=function () {
            tab[prev].classList.remove("hot");
            tab[i].classList.add("hot");
            prev=i;
            console.log(tab[i]);
            type=tab[i].type;
            todolist(istype(type));
        };
    }
    tab[0].onclick();
//    添加事件  id content date status
    let form=document.querySelector("form")
    let input=document.querySelectorAll("input");
    input[1].onclick=function(e){
        e.preventDefault();
        console.log(sub());
        arr.push(sub());
        console.log(arr);
        todolist(istype(type));
        form.reset();
    }
    function sub() {
        let id=arr[arr.length-1].id+1;
        let content=input[0].value;
        let time=new Date().toLocaleString().slice(0,9);
        let status=false;
        return ({id,content,time,status});
    }
//

    let str = localStorage.getItem('arr');
    if (!str){
        saveData();
        str = localStorage.getItem('arr');
    }
    arr = JSON.parse(str);
    function saveData(){
        let str = JSON.stringify(arr);
        console.log(str);
        localStorage.setItem('arr',str);
    }

//    封装判断类型
function istype(type){
    let newarr=[];
    switch (type) {
        case "all":
            return newarr=arr;
            break;
        case "done":
            newarr=arr.filter(function (arr) {
                return arr.status;
            });
            break;
        case "doing":
            newarr=arr.filter(function (arr) {
                return !arr.status;
            });
            break;
    }
    return newarr;
}
    //渲染列表
    function todolist(arr){
        let html='';
        arr.forEach(function (elm) {
            if(elm.status){
                    html+=`
                    <li id=${elm.id}>
                    <input type="checkbox" checked>
                    <p>${elm.content}</p>  
                    <del>×</del>
                    <span>${elm.time}</span>
                    </li>
                    `;
            }else {
                    html+=`
                        <li id=${elm.id}>
                        <input type="checkbox">
                        <p>${elm.content}</p>  
                        <del>×</del>
                        <span>${elm.time}</span>
                        </li>
                    `;
            }

        })
        content.innerHTML=html;
    }
    content.onclick=function (e) {
        let target=e.target;
        let parent=target.parentNode;
        // console.log(target.nodeName);
        if(target.nodeName=="INPUT"){
            let index=arr.findIndex(elem=>parent.id==elem.id);
            console.log(arr[index].status);
            if(arr[index].status==true){
                arr[index].status=false;
            }else {
                arr[index].status=true;
            }
            console.log(arr[index].status);
            // console.log(1);
        }else if(target.nodeName=="DEL"){
            arr=arr.filter(elem=>parent.id!=elem.id);
            console.log(arr);
            // console.log(2);
        }
        todolist(istype(type));
    }
});
