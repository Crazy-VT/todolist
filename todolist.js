$(function () {
    let lis=$('.tab >li');
    console.log(lis);
    let contentBox=$('.content');
    let todolist=[
        {id:1,content:'企业网站',status:true,time:'2019/5/6'},
        {id:2,content:'商城APP',status:true,time:'2019/6/10'},
        {id:3,content:'jQuery-todolist',status:false,time:'2019/6/11'},
        {id:4,content:'四级考试',status:false,time:'2019/6/15'},
        {id:5,content:'PHP后台学习',status:false,time:'2019/6/12'}
        ];
    let str=localStorage.getItem('todolist');
        if(!str){
            localStorage.setItem('todolist',JSON.stringify(todolist))
        }
        todolist=JSON.parse(str);
    lis.on('click',function () {
        let _this=$(this);
        let type=_this.attr('type');
        $(this).addClass('hot').siblings('li').removeClass('hot');
        let Data=filterData(type);
        render(Data);
    });
    lis.triggerHandler('click');
    contentBox.on('click','del',function () {
        let _this=$(this);
        console.log(_this);
        let li=_this.closest('li');
        console.log(li);
    })
    function filterData(type) {
        let arr = [];
        switch (type) {
            case 'all':
                arr=todolist;
                break;
            case 'done':
                arr=todolist.filter(elem=>elem.status) ;
                break;
            case 'doing':
                arr=todolist.filter(elem => !elem.status);
                break;
        }
        return arr;
    }
    function render(arr) {
        let html=``;
        arr.forEach(elem=> {
            if(elem.status){
            html +=`
            <li>
                <input type="checkbox" checked> <p>${elem.content}</p>
                <del>×</del> <span>${elem.time}</span>
            </li>
            `
        }else{
            html +=`
            <li>
                <input type="checkbox"> <p>${elem.content}</p>
                <del>×</del><span>${elem.time}</span>
            </li>
            `
        }
        });
        contentBox.html(html);
    }
})