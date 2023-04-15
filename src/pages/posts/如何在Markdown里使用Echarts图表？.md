---
title: 如何在Markdown里使用Echarts图表？
date: 
updated:
tags:
- 原创
- markdown
categories:
- 博客
banner_img: https://images.unsplash.com/photo-1432847712612-926caafaa802?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80
index_img: https://images.unsplash.com/photo-1432847712612-926caafaa802?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80

---

## 使用HTML润色文本

<span  style="color: #519D9E; ">#519D9E颜色演示</span>

## Markdown里图片引入的三种方法


- 第一种

```html
<img src="https://images.unsplash.com/photo-1533257266619-e841826ce739?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80" 
alt="some_text">
```

<img src="https://images.unsplash.com/photo-1533257266619-e841826ce739?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80" alt="some_text">

- 第二种

```
![图片引用方法二](/image/test.jpg)
```

![图片引用方法三](/image/test.jpg)

- 第三种

```
{% asset_img image/test.png 图片引用方法一 %}
```

{% image test.jpg 图片引用方法一 %}


## 引入外部HTML - 使用iframe

<iframe src="//https://jaling9.github.io/index.html" width="100%" height="400" name="topFrame" scrolling="yes" noresize="noresize" frameborder="0" id="topFrame"> </iframe>

也可以是视频音乐等

```html
<iframe src="//player.bilibili.com/player.html?aid=689464853&bvid=BV1Wm4y1F7cs&cid=871780885&page=1" width="100%" height="600" name="topFrame" scrolling="yes" noresize="noresize" frameborder="0" id="topFrame"> </iframe>
```

<iframe src="//player.bilibili.com/player.html?aid=689464853&bvid=BV1Wm4y1F7cs&cid=871780885&page=1" width="100%" height="400" name="topFrame" scrolling="yes" noresize="noresize" frameborder="0" id="topFrame"> </iframe>



## 引入本地echasrts 方法一 使用iframe引入html文件

<iframe src="//html-echarts/render.html" width="100%" height="600" name="topFrame" scrolling="yes" noresize="noresize" frameborder="0" id="topFrame"></iframe>


## 引入本地echarts 方法二 直接写HTML和JS

```html
<body style="height: 600px;;weight:100%: margin: 0;weight:100%">
    <div id="container" style="height: 400px;weight:100%"></div>
    <script type="text/javascript" src="https://fastly.jsdelivr.net/npm/echarts@5.4.0/dist/echarts.min.js"></script>
    <script type="text/javascript">
        var dom = document.getElementById('container');
        var myChart = echarts.init(dom, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });
        var app = {};
        var option;
        option = {
            backgroundColor: '#2c343c',
            title: {
                text: 'Customized Pie',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [{
                name: 'Access From',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [{
                    value: 335,
                    name: 'Direct'
                }, {
                    value: 310,
                    name: 'Email'
                }, {
                    value: 274,
                    name: 'Union Ads'
                }, {
                    value: 235,
                    name: 'Video Ads'
                }, {
                    value: 400,
                    name: 'Search Engine'
                }].sort(function(a, b) {
                    return a.value - b.value;
                }),
                roseType: 'radius',
                label: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                itemStyle: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function(idx) {
                    return Math.random() * 200;
                }
            }]
        };
        if (option && typeof option === 'object') {
            myChart.setOption(option);
        }
        window.addEventListener('resize', myChart.resize);
    </script>
</body>
```

<body style="height: 600px;;weight:100%: margin: 0;weight:100%">
    <div id="container" style="height: 400px;weight:100%"></div>
    <script type="text/javascript" src="https://fastly.jsdelivr.net/npm/echarts@5.4.0/dist/echarts.min.js"></script>
    <script type="text/javascript">
        var dom = document.getElementById('container');
        var myChart = echarts.init(dom, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });
        var app = {};
        var option;
        option = {
            backgroundColor: '#2c343c',
            title: {
                text: 'Customized Pie',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [{
                name: 'Access From',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [{
                    value: 335,
                    name: 'Direct'
                }, {
                    value: 310,
                    name: 'Email'
                }, {
                    value: 274,
                    name: 'Union Ads'
                }, {
                    value: 235,
                    name: 'Video Ads'
                }, {
                    value: 400,
                    name: 'Search Engine'
                }].sort(function(a, b) {
                    return a.value - b.value;
                }),
                roseType: 'radius',
                label: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                itemStyle: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function(idx) {
                    return Math.random() * 200;
                }
            }]
        };
        if (option && typeof option === 'object') {
            myChart.setOption(option);
        }
        window.addEventListener('resize', myChart.resize);
    </script>
</body>


## 引入本地echarts 方法三 使用tags语法引入JS代码

通过jsDelivr的CDN引入echarts
<script src="https://cdn.jsdelivr.net/npm/echarts@4.8.0/dist/echarts.min.js"></script>

使用GL里的各种组件时需要添加，否则可不需要
<script src="https://cdn.jsdelivr.net/npm/echarts-gl@1.1.1/dist/echarts-gl.min.js"></script>


```javascript
{% echarts 400 '85%' %} 
 // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    var option = {
        { % echarts 400 '85%' %
        }
        option = {
            title: {
                text: '堆叠区域图'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '邮件营销',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [120, 132, 101, 134, 90, 230, 210]
            }, {
                name: '联盟广告',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [220, 182, 191, 234, 290, 330, 310]
            }, {
                name: '视频广告',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [150, 232, 201, 154, 190, 330, 410]
            }, {
                name: '直接访问',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [320, 332, 301, 334, 390, 330, 320]
            }, {
                name: '搜索引擎',
                type: 'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {},
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }]
        }; { % endecharts %
        }
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    // 刷新调整
    window.onresize = function() {
        myChart.resize();
    };
{% endecharts %}
```

{% echarts 400 '85%' %} 
option = { title: { text: '堆叠区域图' }, tooltip: { trigger: 'axis', axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } } }, legend: { data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'] }, toolbox: { feature: { saveAsImage: {} } }, grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true }, xAxis: [ { type: 'category', boundaryGap: false, data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] } ], yAxis: [ { type: 'value' } ], series: [ { name: '邮件营销', type: 'line', stack: '总量', areaStyle: {}, data: [120, 132, 101, 134, 90, 230, 210] }, { name: '联盟广告', type: 'line', stack: '总量', areaStyle: {}, data: [220, 182, 191, 234, 290, 330, 310] }, { name: '视频广告', type: 'line', stack: '总量', areaStyle: {}, data: [150, 232, 201, 154, 190, 330, 410] }, { name: '直接访问', type: 'line', stack: '总量', areaStyle: {}, data: [320, 332, 301, 334, 390, 330, 320] }, { name: '搜索引擎', type: 'line', stack: '总量', label: { normal: { show: true, position: 'top' } }, areaStyle: {}, data: [820, 932, 901, 934, 1290, 1330, 1320] } ] };
{% endecharts %}

{% echarts 400 '85%' %} 
option = { xAxis: { type: 'category', boundaryGap: false }, yAxis: { type: 'value', boundaryGap: [0, '30%'] }, visualMap: { type: 'piecewise', show: false, dimension: 0, seriesIndex: 0, pieces: [{ gt: 1, lt: 3, color: 'rgba(0, 180, 0, 0.5)' }, { gt: 5, lt: 7, color: 'rgba(0, 180, 0, 0.5)' }] }, series: [ { type: 'line', smooth: 0.6, symbol: 'none', lineStyle: { color: 'green', width: 5 }, markLine: { symbol: ['none', 'none'], label: {show: false}, data: [ {xAxis: 1}, {xAxis: 3}, {xAxis: 5}, {xAxis: 7} ] }, areaStyle: {}, data: [ ['2019-10-10', 200], ['2019-10-11', 400], ['2019-10-12', 650], ['2019-10-13', 500], ['2019-10-14', 250], ['2019-10-15', 300], ['2019-10-16', 450], ['2019-10-17', 300], ['2019-10-18', 100] ] } ] }; {% endecharts %}


{% echarts 400 '85%' %} 
 option = {
            backgroundColor: '#2c343c',
            title: {
                text: 'Customized Pie',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [{
                name: 'Access From',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [{
                    value: 335,
                    name: 'Direct'
                }, {
                    value: 310,
                    name: 'Email'
                }, {
                    value: 274,
                    name: 'Union Ads'
                }, {
                    value: 235,
                    name: 'Video Ads'
                }, {
                    value: 400,
                    name: 'Search Engine'
                }].sort(function(a, b) {
                    return a.value - b.value;
                }),
                roseType: 'radius',
                label: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                itemStyle: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function(idx) {
                    return Math.random() * 200;
                }
            }]
        };
{% endecharts %}



> 参考：
> https://hexo.fluid-dev.com/posts/hexo-echarts/#
> https://pxxyyz.com/posts/html-in-Fluid/#
> https://echarts.apache.org/examples/zh/index.html#chart-type-bar

