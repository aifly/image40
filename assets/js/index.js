!function(){


            function Face(option){
                var option = option || {};
                this.obj = option.obj;
                this.init();
                this.opacity = 0;
            };

            Face.prototype = {
                constructor:Face,
                init:function(){
                    this.x = 0;
                    this.y = 0;
                    this.vx = Math.random() * -60 - 5;
                    this.vy = Math.random() * -60 -10;
                    this.opacity = 0;
                    this.obj.style.opacity = 0;
                    this.obj.style.transform = 'translate(' + this.x + 'px,' + this.y + 'px)'
                },
                animate:function(){
                    if(this.opacity === 0){
                        this.obj.style.opacity =  1;
                        this.opacity = 1;
                    }
                    this.x += this.vx;
                    this.y += this.vy;
                    this.vy+=Math.random()*3+2;
                    this.obj.style.opacity*=.9;
                    this.obj.style.transform = 'translate('+this.x+'px,'+this.y+'px)'
                },
            };


            

            var util = {
                loading: function(arr, fn, fnEnd) {
                    var len = arr.length;
                    var count = 0;
                    var i = 0;

                    function loadimg() {
                        if (i === len) {
                            return;
                        }
                        var img = new Image();
                        img.onload = img.onerror = function() {
                            count++;
                            if (i < len - 1) {
                                i++;
                                loadimg();
                                fn && fn(i / (len - 1), img.src);
                            } else {
                                fnEnd && fnEnd(img.src);
                            }
                        };
                        img.src = arr[i];
                    }
                    loadimg();
                },
                bindEvent(){
                    
                    var $ = this.$;
                    $('#loading').ontouchstart = function(e){
                        e.preventDefault();
                    }
                    var mask = $('#zmiti-mask');
                    mask.ontouchstart = function(){
                        this.style.display = 'none';
                    }

                    $("#zmiti-share").ontouchend = function(){
                        mask.style.display = 'block'
                    };

                    $("#zmiti-submit-input").ontouchstart = function(e){
                        //
                        if(e.target.nodeName === 'TEXTAREA'){
                            return
                        }
                        e.preventDefault();
                    };
                    $("#zmiti-back-btn").ontouchend = function(){
                        $("#zmiti-submit-input").classList.remove("active");
                    };
                    this.$("#zmiti-input-enable").ontouchend = function(){
                        //$(".zmiti-msg-input").classList.add('active');
                        $("#zmiti-submit-input").classList.add("active");
                        
                        setTimeout(function(){
                            $("#submit-msg").focus(); 
                        },10)
                       
                    };
                   
                    var d = new Date();
                    var s = this;
                    $("#zmiti-submit-btn").ontouchend = function(){
                        var val = $("#submit-msg").value;
                        var img = $("#zmiti-result>img");
                        img.classList.remove("error");
                        if(!val){
                            img.src = './assets/images/error1.png';
                            img.classList.add('error');
                            $('#zmiti-result>div').innerHTML = '留言内容不能为空';
                            $('#zmiti-result').classList.add('active');
                            setTimeout(() => {
                                $('#zmiti-result').classList.remove('active');
                            }, 2000);
                            return;
                        }
                         axios.post(s.host + '/xhs-security-activity/activity/comment/saveComment', {
                             "secretKey": s.secretKey, // 请求秘钥
                             comment:val,
                             submit:d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds(),
                             "nm": "image40" // 活动某组图片点赞标识 或者活动某组图片浏览量标识 标识由更新接口定义
                         }).then(function (data) {
                             var dt = data.data;
                             if(typeof dt === 'string'){
                                 dt = JSON.parse(dt);
                             }
                             if(dt.rc === 0){
                                $('#zmiti-result>img').src = './assets/images/right1.png';
                                $('#zmiti-result>div').innerHTML = '提交成功';
                                setTimeout(function(){
                                    $("#zmiti-result").classList.add("active");
                                }, 100);
                                

                             }
                             else{
                                 $('#zmiti-result>img').src = './assets/images/error1.png';
                                 $('#zmiti-result>div').innerHTML = '提交失败';
                                 setTimeout(function() {
                                     $("#zmiti-result").classList.add("active");
                                 }, 100);
                             }

                             setTimeout(() => {
                                 $("#zmiti-submit-input").classList.remove("active");
                                $(".zmiti-msg-input").classList.remove('active');
                                $('#zmiti-result').classList.remove('active');
                                $("#submit-msg").value = "";
                             }, 2000);
                         });
                    };
                },
                $:function(selector){
                    return document.querySelector(selector);
                },
                imgList:[
                    {
                        title:'家里的那辆“车”',
                        imgs:[
                            './assets/images/2-2.png',
                            './assets/images/1-2.png',
                        ],
                        desc:'1979年，山东济南，28岁的李伏英用自行车推着刚满一岁的儿子张侃出行。2018年，张侃用私家车接送母亲李伏英。'
                    },
                     {
                        title:'土坯变民宿',
                        imgs:[
                            './assets/images/4-2.png',
                            './assets/images/3-2.png',
                        ],
                        desc:'1996年，浙江安吉，外婆徐苗香抱着11个月的蓝晴霞在土坯房里。2018年，蓝晴霞和外婆在土坯房改造的自家小洋楼民宿外。'
                    },
                    {
                        title:'“武”出我家',
                        imgs:[
                            './assets/images/5-2.png',
                            './assets/images/6-2.png',
                        ],
                        desc:'2002年，河南兰考，4岁的李傲星在老式青砖房前打拳。2018年，李傲星在150平方米的大房子前打拳。 '
                    },
                    {
                        title:'孩童变警察',
                        imgs:[
                            './assets/images/8-2.png',
                            './assets/images/7-2.png',
                        ],
                        desc:'1985年，山东菏泽，6岁的周鹏在老家习武。2018年，中国人民公安大学老师的周鹏在北京家中展示篮球。'
                    },
                    {
                        title:'“茅草房”大变身',
                        imgs:[
                            './assets/images/10-2.png',
                            './assets/images/9-2.png',
                        ],
                        desc:'1982年，安徽省凤阳县小岗村，“大包干”带头人之一严宏昌在茅草房前。2018年，严宏昌和家庭成员在自家房屋前合影。'
                    },
                    {
                        title:'汽车见我“兄弟情”',
                        imgs:[
                            './assets/images/12-2.png',
                            './assets/images/11-2.png',
                        ],
                        desc:'1994年，西藏阿里，24岁强巴（右二）和兄弟在“东风”运输车前合影。2018年，西藏山南，强巴（右二）和兄弟在私家车前合影。'
                    },{
                        title:'大兴安岭的姐弟俩',
                        imgs:[
                            './assets/images/14-2.png',
                            './assets/images/13-2.png',
                        ],
                        desc:'1985年，黑龙江大兴安岭地区，8岁的崔波和弟弟手持电话模型。2018年，崔波和弟弟在一个高层小区合影。'
                    },{
                        title:'小女孩长成了大姑娘',
                        imgs:[
                            './assets/images/15-2.png',
                            './assets/images/16-2.png',
                        ],
                        desc:'1994年，安徽合肥，6岁的周爱际在水泥板拼接成的“大板楼”家里。2018年，周爱际在160平方米大房子里。'
                    },{
                        title:'电视“变形”记',
                        imgs:[
                            './assets/images/18-2.png',
                            './assets/images/17-2.png',
                        ],
                        desc:'1991年，河南开封，6岁的柏扬在家中，家中彩电24英寸。2018年，柏扬和儿子在北京家中，家中彩电60多英寸。'
                    },{
                        title:'告别窑洞进楼房',
                        imgs:[
                            './assets/images/20-2.png',
                            './assets/images/19-2.png',
                        ],
                        desc:'1997年，山西太原，69岁薛美香在自家窑洞里切肉。2018年，90岁的薛美香在自家房子里切水果。'
                    }
                    /*,{
                        title:'吴家有女初长成【黑龙江分社 王建威 王凯】',
                        imgs:[
                            './assets/images/22-1.jpg',
                            './assets/images/21-1.jpg',
                        ],
                        desc:'左图，1993年1月，哈尔滨市民吴濯蓥在家里拍照。（新华社发）右图，2018年8月6日，哈尔滨市民吴濯蓥在家里当年的位置拍照。（新华社记者王凯摄）'
                    },{
                        title:'小女孩长成了大姑娘【安徽分社 刘军喜 张端】',
                        imgs:[
                            './assets/images/24-1.jpg',
                            './assets/images/23-1.jpg',
                        ],
                        desc:'左图，11994年，6岁的周爱际在位于安徽省合肥市包河区金寨南路社区的家里玩耍。（新华社记者刘军喜翻拍）右图，2018年11月11日，30岁的周爱际在位于安徽省合肥市包河区金寨南路社区的家里。（新华社记者刘军喜摄）'
                    },{
                        title:'我们这一家子【安徽分社 刘军喜 张端】',
                        imgs:[
                            './assets/images/26-1.jpg',
                            './assets/images/25-1.jpg',
                        ],
                        desc:'左图，1992年，卫世平（后右）、妻子陆广梅（后左）、大女儿陆海燕（前右）、二女儿陆海娣（前左）、儿子卫林（前中）合影留念。右图，2018年11月14日，卫世平（前右）、妻子陆广梅（前左）、大女儿陆海燕（后右）、二女儿陆海娣（后左）、儿子卫林（中）在合肥市滨湖欣园社区的家中合影。新华社记者 张端 摄'
                    },{
                        title:'从小学习做家务【广东分社 唐寿新】',
                        imgs:[
                            './assets/images/28-1.jpg',
                            './assets/images/27-1.jpg',
                        ],
                        desc:'左图为1999年8月6日，9岁的唐诗言在东莞市长安镇家里洗碗（唐寿新摄），右图为2018年11月1日，28岁的唐诗言在东莞市长安镇家里洗碗。'
                    },{
                        title:'琴声悠悠岁月长【广东分社 唐寿新】',
                        imgs:[
                            './assets/images/30-1.jpg',
                            './assets/images/29-1.jpg',
                        ],
                        desc:'左图为1994年7月12日，4岁的唐诗言在东莞市长安镇家里练习电子琴（唐寿新摄），右图为2018年11月1日，28岁的唐诗言在东莞市长安镇家里练习钢琴。'
                    },{
                        title:'妈妈陪你长大！【江西分社 彭昭之】',
                        imgs:[
                            './assets/images/32-1.jpg',
                            './assets/images/31-1.jpg',
                        ],
                        desc:'左图，摄于1989年 当时33岁的周月娇和7岁的儿子徐涛在江西省南昌市青云谱区京山老街的老房子里合影，当时周月娇是一名普通的社区干部。（彭昭之）右图，今年62岁的周月娇和36岁的儿子徐涛正在南昌市青云谱区三家店街道祥和社区的家中合影，如今的儿子徐涛也有了自己的两个孩子。（彭昭之）'
                    },{
                        title:'姐妹情深【江西分社 彭昭之】',
                        imgs:[
                            './assets/images/34-1.jpg',
                            './assets/images/33-1.jpg',
                        ],
                        desc:'左图，摄于1991年 当时4岁的卢婧（右）和2岁的表妹李良智正在家中一起玩耍吃东西，当时他们家位于江西省南昌市青云谱区井冈山大道东后巷。（彭昭之）右图，今年31岁的卢婧（右）和29岁的表妹李良智正在位于江西省南昌市青云谱三家店街道的家中一边聊天一边吃零食。（彭昭之）'
                    },{
                        title:'纸质书变电子书【江西分社 万象】',
                        imgs:[
                            './assets/images/36-1.jpg',
                            './assets/images/35-1.jpg',
                        ],
                        desc:'左图，江西南昌市民彭菁在家中看书（1993年摄）（翻拍照片）。右图，江西南昌市民彭菁（左）抱着儿子在家中的沙发上看电子书（2018年11月14日摄）。新华社记者 万象 摄'
                    },{
                        title:'在洪湖里长大，在洪湖外安家【湖北分社 熊琦】',
                        imgs:[
                            './assets/images/38-1.jpg',
                            './assets/images/37-1.jpg',
                        ],
                        desc:'左图，拆网上岸前，王贵宝一家在洪湖上的住所。（资料照片）右图，王贵宝（右一）与父母在新家里。（新华社记者 熊琦 摄）'
                    },{
                        title:'外婆、妈妈和我【山西分社 詹彦】',
                        imgs:[
                            './assets/images/40-1.jpg',
                            './assets/images/39-1.jpg',
                        ],
                        desc:'左图，1990年10月，在山西省太原市古交市（县级市），5岁的张斯和妈妈要平智在家中合影（翻拍照片，2018年11月13日摄）。右图，11月13日，在山西省太原市小店区，33岁的张斯和5岁的女儿韩斯旸在家中合影。新华社记者 詹彦 摄 '
                    },{
                        title:'从茅草房搬进小楼房【广西分社 张爱林】',
                        imgs:[
                            './assets/images/42-1.jpg',
                            './assets/images/41-1.jpg',
                        ],
                        desc:'左图，那坡县边境零公里线上甲柳村上保屯苗族青年吴亚路家的茅草房（2009年7月14日摄）。右图，那坡县边境零公里线上甲柳村上保屯苗族青年吴亚路家房屋（2018年3月15日摄）新华社记者张爱林摄'
                    },{
                        title:'一条路的变迁【广西分社 张爱林】',
                        imgs:[
                            './assets/images/44-1.jpg',
                            './assets/images/43-1.jpg',
                        ],
                        desc:'左图，那坡县边境零公里线上甲柳村上保屯十年前的进屯路（2009年7月14日摄）。右图，那坡县边境零公里线上甲柳村上保屯现在的进村路（2018年6月7日摄）新华社记者张爱林摄'
                    },{
                        title:'姐弟俩【广西分社 张爱林】',
                        imgs:[
                            './assets/images/46-1.jpg',
                            './assets/images/45-1.jpg',
                        ],
                        desc:'左图，那坡县边境零公里线上那布村水弄一社儿时的陶美星跟随姐姐上山拾取柴火的照片（2009年4月5日摄）。右图，那坡县边境零公里线上那布村水弄一社陶美星和姐姐共度周末的照片（2018年3月17日摄）新华社记者张爱林摄'
                    },{
                        title:'苗族婚宴的变迁【广西分社 张爱林】',
                        imgs:[
                            './assets/images/48-1.jpg',
                            './assets/images/47-1.jpg',
                        ],
                        desc:'左图，十几年前那坡县边境零公里线上那布村水弄一社一户苗族青年结婚宴（2008年11月5日摄）。右图，那坡县边境零公里线上甲柳村上保屯苗族青年吴文荣的婚宴（2018年3月6日摄）新华社记者张爱林摄'
                    }*/
                ],
                $$:function(selector){
                    return document.querySelectorAll(selector);
                },
                secretKey: "e9469538b0623783f38c585821459454",
                host: "https://xlive.xinhuaapp.com", //测试域名：https://testxlive.xinhuaapp.com
                layout:function(){
                    var faceImgs = '';
                    for(var i=1;i<=15;i++){
                        faceImgs +="<div class='zmiti-face'><img draggable='false' src='./assets/images/"+i+".gif'/></div>"
                    }
                    var html = '<div class="zmiti-title">轻轻地滑动手指，你将看到这40个中国普通百姓家庭的新旧影像。它们如吉光片羽，沉淀了岁月的痕迹，承载了穿越时空的亲情；它们浓缩了沧海巨变，折射了改革开放创造的中国奇迹。</div>'
                    this.imgList.forEach(function(img,i){
                        if(img.title){
                            html+="<div class='zmiti-swpier-item'>\
                                        <h3 class='zmiti-header'>"+(i+1)+"、"+img.title+"</h3>\
                                        <div class='zmiti-img-box'>\
                                            <img draggable='false' src='"+img.imgs[0]+"' class='zmiti-img' />\
                                            <img draggable='false' src='"+img.imgs[1]+"' class='zmiti-img' />\
                                            <canvas></canvas>\
                                            <div class='zmiti-swipe-bar'></div>\
                                        </div>\
                                        <div class='zmiti-swiper-bottom'>\
                                            "+img.desc+"\
                                        </div>\
                                        <div class='zmiti-like'>\
                                            <img draggable='false' src='./assets/images/like1.png'/>\
                                            <span class='zmiti-img-like-num'>0</span>\
                                            "+ faceImgs+"\
                                        </div>\
                                    </div>"
                        }
                    })

                   
                    var s = this;
                    var $$ = s.$$;
                    this.$('.zmiti-main-ui').innerHTML = html;

                    var otherhtml = "\
                     <div class='zmiti-msg-input'>\
                        <div>\
                            <div class='zmiti-input-enable' id='zmiti-input-enable'>\
                                <img src='./assets/images/edit.png'/>  写留言...\
                            </div>\
                            <div class='zmiti-discuss'>\
                                <img src='./assets/images/msg.png'/>\
                            </div>\
                            <div class='zmiti-share' id='zmiti-share'>\
                                <img src='./assets/images/share.png'/>\
                            </div>\
                        </div>\
                    </div>\
                    <div class='zmiti-submit-input' id='zmiti-submit-input'>\
                        <div style='line-height:90px;height:60px;;text-align:left;margin-left:5%'>请输入您的留言</div>\
                    <textarea id='submit-msg'></textarea>\
                        <div class='zmiti-submit-btn' id='zmiti-submit-btn'>\
                            提交\
                        </div>\
                        <div class='zmiti-submit-btn' id='zmiti-back-btn' style='margin:30px 1% 50px'>\
                            返回\
                        </div>\
                    </div>\
                    <div class='zmiti-mask' id='zmiti-mask'>\
                        <img src='./assets/images/arrow.png' />\
                    </div>\
                    <div class='zmiti-result ' id='zmiti-result'>\
                        <img src='./assets/images/error1.png' />\
                        <div></div>\
                    </div>";
                    document.body.innerHTML+= otherhtml;
                    var likes = this.$$('.zmiti-like');
                    likes.forEach(function(like,k){
                        var faces = like.querySelectorAll('.zmiti-face');
                        var facesAry = [];
                        faces.forEach(function (face, i) {
                            facesAry.push(new Face({
                                obj:face
                            }));
                        });
                        t = null;
                       
                        like.index = k;
                        like.addEventListener('touchend',function(){
                            if(t === null){
                                t =  setInterval(function () {
                                    facesAry.forEach(function (face) {
                                        face.animate();
                                    })
                                }, 30);
                                
                                s.like(this.index,like);
                               
                            }
                            setTimeout(function() {
                                clearInterval(t);
                                t = null;
                                facesAry.forEach(function(face) {
                                    face.init();
                                });
                            }, 1000);
                        });
                    })
                },
                like: function(index) {
                    var s = this;
                    var $$ = this.$$;
                    axios.post(s.host + '/xhs-security-activity/activity/num/updateNum', {
                        "secretKey": s.secretKey, // 请求秘钥
                        "nm": "xhs-image40-like-" + (index + 1) // 活动某组图片点赞标识 或者活动某组图片浏览量标识 标识由更新接口定义
                    }).then(function(data) {
                        var dt = data.data;
                        if (typeof dt === 'string') {
                            dt = JSON.parse(dt);
                        }
                        if (dt.rc === 0) {
                            var numObj = $$(".zmiti-swpier-item")[index].querySelector('.zmiti-img-like-num');
                            numObj.innerHTML = numObj.innerHTML * 1 + 1;
                        }
                    });
                    
                },
                getPV:function(id){
                    var s = this;
                    var $$ = this.$$;
                    axios.post(this.host +'/xhs-security-activity/activity/num/getNum',{
                        "secretKey": s.secretKey,  // 请求秘钥
                        "nm": "xhs-image40-like-"+id // 活动某组图片点赞标识 或者活动某组图片浏览量标识 标识由更新接口定义
                    }).then(function(data){
                        var dt = data.data;
                        if(typeof dt === 'string'){
                            dt = JSON.parse(dt);
                        }
                        $$(".zmiti-swpier-item")[id - 1].querySelector('.zmiti-img-like-num').innerHTML = dt.data.num;
                    });
                },
                init:function(){
                    
                    var imgList = [
                        './assets/images/right1.png',
                        './assets/images/error1.png',
                        './assets/images/edit.png',
                    ];
                    var s = this;
                    this.imgList.forEach(function(img,i){
                        imgList = imgList.concat(img.imgs);
                    });

                    var pro = s.$('#progress');
                    this.loading(imgList,function(e){
                       pro.innerHTML = (e*100|0)+"%";
                    },function(){

                       s.$('#loading').style.display = 'none';
                       s.layout();
                       s.setSize();
                        s.bindEvent();
                       
                       s.imgList.forEach(function(img, i) {
                           s.getPV(i + 1);
                       });
                       
                    })
                },
                initCanvas:function(){
                    var self = this;
                    this.canvases.forEach(function(item,i){
                   ///var {canvas,imgs,box,offsetLeft} = item;
                    var canvas = item.canvas,
                        box = item.box,
                        imgs = item.imgs,
                        offsetLeft = item.offsetLeft;
                        var context = canvas.getContext('2d');
                        var img = new Image();
                        var s = 0.5;
                        img.onload = function(){
                            var scale = this.width / canvas.width;
                            context.drawImage(imgs[0],0,0,canvas.width,canvas.height);
                            setTimeout(function(){
                                context.drawImage(imgs[1],0,0,canvas.width*scale*s,canvas.height*scale,0,0,canvas.width*s,canvas.height);
                            },100)
                            var bar = box.querySelector('.zmiti-swipe-bar');
                            var doc = document;
                            function start(e){

                                var heart = doc.createElement('img');
                                heart.src = './assets/images/heart.png';
                                heart.className='zmiti-heart';

                                heart.addEventListener('animationend',function(){
                                    box.removeChild(this);
                                });

                                var node = e.target.parentNode.parentNode;
                                var index = -1;
                                self.$$(".zmiti-main-ui>.zmiti-swpier-item").forEach(function(item,i){
                                    if(item === node){
                                        index = i;
                                    }
                                });

                               
                                self.like(index);
                                
                                box.appendChild(heart);
                                heart.style.left = (e.changedTouches[0].pageX / 750)*100 + '%';
                                heart.style.top = e.changedTouches[0].pageY - box.offsetTop + 'px';
                                
                                //e.preventDefault();
                                document.ontouchmove = function(e){
                                    
                                    var pageX = e.changedTouches[0].pageX;
                                    s = (pageX - offsetLeft) / canvas.width;
                                    context.clearRect(0,0,canvas.width,canvas.height);
                                    context.drawImage(imgs[0],0,0,canvas.width,canvas.height);
                                    
                                    context.drawImage(imgs[1],0,0,canvas.width*scale*s,canvas.height*scale,0,0,canvas.width*s,canvas.height);
                                    bar.style.left = Math.min(Math.max(s*100,0),99)+'%';
                                    return false;
                                }
                                document.ontouchend = function(e){
                                    e.preventDefault();
                                    document.ontouchmove = null;
                                    document.ontouchend = null;
                                    var ss = s;
                                    setTimeout(function(){
                                        var t = setInterval(function(){
                                            if(s>.5){
                                                s-=.04;
                                            }
                                            else{
                                                s+=.04;                                           
                                            }
                                             if(Math.abs(s -.5)<=.08){
                                                s = .5;
                                                clearInterval(t);
                                            }

                                            context.clearRect(0,0,canvas.width,canvas.height);
                                            context.drawImage(imgs[0],0,0,canvas.width,canvas.height);
                                            
                                            context.drawImage(imgs[1],0,0,canvas.width*scale*s,canvas.height*scale,0,0,canvas.width*s,canvas.height);
                                            bar.style.left = Math.min(Math.max(s*100,0),99)+'%';


                                        },20);
                                    },100)

 
                                }
                            }
                            
                            box.ontouchstart = function(e){
                                start(e);
                               // return false;
                            }
                        }
                        img.src = imgs[0].src;
                     });
                },
               
                setSize:function(){
                    var $$ = this.$$;
                    this.canvases = [];
                    var self = this;
                    setTimeout(function(){
                        for(var i = 0;i<$$('.zmiti-img-box').length;i++){
                            var box = $$('.zmiti-img-box')[i];
                            var offsetLeft = box.offsetLeft;
                            var imgs = box.querySelectorAll('.zmiti-img');
                            var canvas = box.querySelector('canvas');
                                canvas.height = box.clientHeight;
                                canvas.width = box.clientWidth;
                                self.canvases.push({canvas,imgs,box,offsetLeft});
                                self.initCanvas();
                        };
                    },100)
                },
            };

            util.init();

        }();