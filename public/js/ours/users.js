$(function(){
        //删除
        $('.icon_close_alt2').click(function(){
            var check=confirm('确认删除吗？');
            if(check==true){
                var uid=$(this).parent().attr('id');
                var that=$(this);
                $.ajax({
                    url:'/userdelete?uid='+uid,
                    type:'get',
                    success:function(data){
                        if(data){
                            that.parent().parent().parent().parent().remove();
                        }
                    }
                })
            }
            else{
                return;
            }

        })

    //vue
    var vm=new Vue({
        el:'#add-user',
        data:{
            flag:0,
            username:'张明明',
            passwd:123,
            sex:3,
            address:'成都市',
            tel:''
        },
        mounted:function(){
            $('#tel').focus();
        },
        methods:{
            usernameisNull:function(e){
                if(e.target.value==''){
                    e.target.placeholder='账号不能为空';
                };
            },
            passwdisNull:function(e){
                if(e.target.value==''){
                    e.target.placeholder='密码不能为空';
                };
            },
            telisNull:function(e){
                if(e.target.value==''){
                    e.target.placeholder='电话不能为空';
                }
                else{
                    var regex=/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/
                    var check=this.tel.match(regex);
                    if(!check){
                        this.tel='';
                        e.target.placeholder='对不起，您输入的电话号码不合法';
                        this.flag=1;
                    }
                    else{
                        this.flag=0;
                    }
                }
            },
            addressisNull:function(e){
                if(e.target.value==''){
                    e.target.placeholder='地址不能为空';
                }
            },
            adduser:function(e){
                if($('#cname').val()!=''&&$('#cpasswd').val()!=''&&$('#tel').val!=''&&$('#subject').val()!=''&&this.flag==0){
                    $.ajax({
                        type:'POST',
                        url:'/useradd',
                        data:{username:this.username,passwd:this.passwd,sex:this.sex,address:this.address,tel:this.tel},
                        success:function(data){
                           if(data.result=='fail'){
                               alert('对不起，该手机号已被注册')
                           }
                           else{
                               alert('注册成功')
                           }
                        }
                    })
                }
                else{
                    return;
                }
            }

        }
    })
})