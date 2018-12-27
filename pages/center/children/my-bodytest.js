// pages/center/children/my-bodytest.js
import {
    formatDate,
    dateAdd
} from "../../../utils/utils"
var wxCharts = require("../../../utils/wxcharts");
var lineChart;
var areaChart;
var columnChart;
var pieChart;
var ringChart;
var chartData = {
    main: {
        title: '总成交量',
        data: [15, 20, 125, 37],
        categories: ['2015年', '2016年', '2017年', '2018年']
    },
    sub: [{
        title: '2015年度成交量',
        data: [76, 54, 23, 12, 45, 65, 89, 152, 29, 37, 48, 79],
        categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    }, {
        title: '2016年度成交量',
        data: [70, 40, 65, 100, 34, 18],
        categories: ['1月', '2月', '3月', '4月', '5月', '6月']
    }, {
        title: '2017年度成交量',
        data: [55, 30, 45, 36, 56, 13],
        categories: ['1月', '2月', '3月', '4月', '5月', '6月']
    }, {
        title: '2018年度成交量',
        data: [76, 45, 32, 74, 54, 35],
        categories: ['1月', '2月', '3月', '4月', '5月', '6月']
    }]
};
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showMap: false,
      showCoverView:false,
        chartTitle: '总成交量',
        isMainChartDisplay: true,
        startDate: formatDate(new Date()), // 订单开始日期：当前日期
        lastestDate: formatDate(dateAdd('y', 1, new Date())), // 一年
        selectedDate: formatDate(new Date()), // 预约取书日期
        polyline: [{
            points: [{
                longitude: 113.3245211,
                latitude: 23.10229
            }, {
                longitude: 113.324520,
                latitude: 23.21229
            }],
            color: "#FF0000DD",
            width: 2,
            dottedLine: true
        }],
        controls: [{
            id: 1,
            iconPath: '../../../images/location.png',
            position: {
                left: 0,
                top: 300 - 50,
                width: 50,
                height: 50
            },
            clickable: true
        }]
    },
  showCoverView: function () {
    this.setData({
      showCoverView: true
    })
  },
  closeCoverView: function () {
    this.setData({
      showCoverView: false
    })
  },
    showMap: function() {
        this.setData({
            showMap: !this.data.showMap
        })
    },
    closeMap: function() {
        this.setData({
            showMap: false
        })
    },
    showSheet: function() {
        wx.showActionSheet({
            itemList: ['东西', '南北', '中东', '华南', '港澳', '西湘'], //数组长度最大为 6
            itemColor: '#009900',
            success(res) {
                console.log('点击了ActionSheet第' + res.tapIndex + '项')
            }
        })
    },
    bindDateChange: function(e) {
        this.setData({
            selectedDate: e.detail.value
        })
    },
    createSimulationData: function() {
        var categories = [];
        var data = [];
        for (var i = 0; i < 25; i++) {
            categories.push('2018-02-' + (i + 1));
            data.push(Math.random() * (20 - 10) + 10);
        }
        return {
            categories: categories,
            data: data
        }
    },
    lineTouchHandler: function(e) {
        lineChart.scrollStart(e);
    },
    areaTouchHandler: function(e) {
        console.log(areaChart.getCurrentDataIndex(e));
        areaChart.scrollStart(e);
    },
    columnTouchHandler: function(e) {
        var index = columnChart.getCurrentDataIndex(e);
        if (index > -1 && index < chartData.sub.length && this.data.isMainChartDisplay) {
            this.setData({
                chartTitle: chartData.sub[index].title,
                isMainChartDisplay: false
            });
            columnChart.updateData({
                categories: chartData.sub[index].categories,
                series: [{
                    name: '东线',
                    data: chartData.sub[index].data,
                    format: function(val, name) {
                        return val.toFixed(2) + '万';
                    }
                }, {
                    name: '西线',
                    color: '#FFB300',
                    data: chartData.sub[index].data,
                    format: function(val, name) {
                        return val.toFixed(2) + '万';
                    }
                }]
            });
        }
    },
    pieTouchHandler: function(e) {
        console.log(pieChart.getCurrentDataIndex(e));
    },
    ringTouchHandler: function(e) {
        console.log(ringChart.getCurrentDataIndex(e));
    },
    backToMainChart: function() {
        this.setData({
            chartTitle: chartData.main.title,
            isMainChartDisplay: true
        });
        columnChart.updateData({
            categories: chartData.main.categories,
            series: [{
                name: '成交量',
                data: chartData.main.data,
                format: function(val, name) {
                    return val.toFixed(0) + '万';
                }
            }, {
                name: '成交量',
                color: '#FFB300',
                data: chartData.main.data,
                format: function(val, name) {
                    return val.toFixed(0) + '万';
                }
            }]
        });
    },
    lineMoveHandler: function(e) {
        lineChart.scroll(e);
    },
    areaMoveHandler: function(e) {
        areaChart.scroll(e);
    },
    lineTouchEndHandler: function(e) {
        lineChart.scrollEnd(e);
        lineChart.showToolTip(e, {
            format: function(item, category) {
                return category + ' ' + item.name + ':' + item.data
            }
        });
    },
    areaTouchEndHandler: function(e) {
        areaChart.scrollEnd(e);
        areaChart.showToolTip(e);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        // 曲线/折线图 可滑动
        var simulationData = this.createSimulationData();
        lineChart = new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: simulationData.categories,
            animation: true,
            series: [{ //可配置多条线性数据
                name: '成交量1',
                data: simulationData.data,
                color: '#7cb5ec',
                format: function(val, name) {
                    return val.toFixed(2) + '万';
                }
            }, {
                name: '成交量1',
                data: [2, 7, 25, 3, 15, 4, null, 10, 52, 19],
                color: '#FF887D',
                format: function(val, name) {
                    return val.toFixed(2) + '万';
                }
            }],
            xAxis: {
                disableGrid: true
            },
            yAxis: {
                title: '成交金额 (万元)',
                format: function(val) {
                    return val.toFixed(2);
                },
                min: 0
            },
            width: windowWidth,
            height: 200,
            dataLabel: true,
            dataPointShape: true,
            enableScroll: true,
            extra: {
                lineStyle: 'curve' //曲线  默认为折线
            }
        });
        //线性区块图
        areaChart = new wxCharts({
            canvasId: 'areaCanvas',
            type: 'area',
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            animation: true,
            series: [{
                name: '成交量1',
                color: '#A3FFC3',
                data: [32, 45, 12, 56, 15, 34, 78, null, 56, 3, 16, 89],
                format: function(val) {
                    return val.toFixed(0) + '万';
                }
            }],
            yAxis: {
                title: '成交金额 (万元)',
                format: function(val) {
                    return val.toFixed(0);
                },
                min: 0,
                fontColor: '#8085e9',
                gridColor: '#8085e9',
                titleFontColor: '#f7a35c'
            },
            xAxis: {
                fontColor: '#7cb5ec',
                gridColor: '#7cb5ec',
                disableGrid: true //禁用x轴刻度分割线
            },
            extra: {
                legendTextColor: '#cb2431'
            },
            width: windowWidth,
            enableScroll: true, //启用横向滚动
            height: 200
        });
        // 柱状图
        columnChart = new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            animation: true,
            categories: chartData.main.categories,
            series: [{ //可配置多组柱状图数据
                name: '成交量',
                data: chartData.main.data,
                format: function(val, name) {
                    return val.toFixed(0) + '万';
                }
            }, {
                name: '成交量',
                color: '#FFB300',
                data: chartData.main.data,
                format: function(val, name) {
                    return val.toFixed(0) + '万';
                }
            }],
            yAxis: {
                format: function(val) {
                    return val + '万';
                },
                title: '成交金额 (万元)',
                min: 0
            },
            xAxis: {
                disableGrid: false,
                type: 'calibration'
            },
            extra: {
                column: {
                    width: 20
                }
            },
            width: windowWidth,
            height: 200
        });
        // 饼状图
        pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
            series: [{
                name: '成交量1',
                data: 15,
            }, {
                name: '成交量2',
                data: 35,
            }, {
                name: '成交量3',
                data: 78,
            }, {
                name: '成交量4',
                data: 63,
            }, {
                name: '成交量5',
                data: 35,
            }, {
                name: '成交量6',
                data: 78,
            }],
            width: windowWidth,
            height: 300,
            dataLabel: true,
        });
        //环状图
        ringChart = new wxCharts({
            animation: true,
            canvasId: 'ringCanvas',
            type: 'ring',
            extra: {
                ringWidth: 45,
                pie: {
                    offsetAngle: -45
                }
            },
            title: {
                name: '70%',
                color: '#7cb5ec',
                fontSize: 20
            },
            subtitle: {
                name: '收益率',
                color: '#666666',
                fontSize: 12
            },
            series: [{
                name: '成交量1',
                data: 15,
                color: '#559955',
                stroke: false
            }, {
                name: '成交量2',
                data: 35,
                color: '#413311',
                stroke: false
            }, {
                name: '成交量3',
                data: 78,
                color: '#331133',
                stroke: false
            }, {
                name: '成交量4',
                data: 63,
                color: '#229900',
                stroke: false
            }],
            disablePieStroke: true,
            width: windowWidth,
            height: 300,
            dataLabel: true,
            legend: true,
            background: '#f5f5f5',
            padding: 0
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})