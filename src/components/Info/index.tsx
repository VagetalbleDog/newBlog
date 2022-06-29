import styled from '@emotion/styled'
import React from 'react'
import {
  EnvironmentOutlined,
  ReadOutlined,
  CheckCircleOutlined,
  MailOutlined
} from '@ant-design/icons'
import ReactECharts from 'echarts-for-react'
const codeSummaryData = [
  { value: 25, rate: '2.7%', name: 'JSON' },
  { value: 20, rate: '2.1%', name: 'HTML' },
  { value: 13, rate: '1.4%', name: 'JavaScript' },
  { value: 244, rate: '26.1%', name: 'CSS' },
  { value: 631, rate: '67.6%', name: 'TypeScript' }
]
const EChartOption = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    left: 'center'
  },
  series: [
    {
      name: '代码统计',
      type: 'pie',
      center: ['50%', '60%'],
      radius: ['45%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      tooltip: {
        formatter: function (params: any) {
          let html = `
            <div style="height:auto;">
              <div style="font-size:14px;font-weight:bold;color:#333;margin-bottom:16px;display:flex;align-items:center;line-height:1;">
                <span style="display:inline-block;margin-right:8px;border-radius:6px;width:6px;height:6px;background-color:${params.color};"></span>
                ${params.data.name}
              </div>
              <div style="font-size:12px;color:#808080;margin-bottom:8px;display:flex;align-items:center;line-height:1;">
                <span style="flex:1;text-align:right;">总计 ${params.data.value} 行</span>
              </div>
              <div style="font-size:12px;color:#808080;margin-bottom:8px;display:flex;align-items:center;line-height:1;">
                <span style="flex:1;text-align:right;">占比 ${params.data.rate}</span>
              </div>
            </div>`
          return html
        }
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '20',
          fontWeight: 'bold'
        }
      },
      data: codeSummaryData
    }
  ]
}
const Info: React.FC = () => {
  return (
    <Container>
      <div className="authorInfo">
        <div className="avatarBorder">
          <img
            className="avatar"
            src="https://avatars.githubusercontent.com/u/95014669?v=4"
            alt=""
          />
        </div>
        <div className="authorName">Zhu Wenfu</div>
        <div className="school">
          <div className="schoolName">
            <ReadOutlined />
            &nbsp; 东北大学
          </div>
          <div className="year">2019 ~ 2023</div>
          <div className="location">
            <EnvironmentOutlined />
            辽宁~沈阳
          </div>
          <div className="major">Major in Information System</div>
          <div className="work">
            <EnvironmentOutlined />
            网易/云音乐/前端开发
          </div>
          <div className="mail">
            <MailOutlined />
            2583243657@qq.com
          </div>
          <div className="sign">🎉 一只正在努力的程序猿</div>
        </div>

        <div className="codeSummary">
          <div className="desc">本项目代码统计</div>
          <ReactECharts option={EChartOption} />
        </div>
      </div>
    </Container>
  )
}
const Container = styled.div`
  .container {
    width: 300px;
  }
  .authorInfo {
    position: fixed;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 900;
    margin: 0 auto;
    margin-top: 20px;
    text-align: center;
    .avatar {
      border: 5px solid cyan;
      width: 195px;
      border-radius: 50%;
    }
    .authorName {
      margin-top: 10px;
      text-align: 28px;
      font-size: 30px;
      color: #1890ff;
      font-weight: 800;
    }
    .school {
      margin-top: 10px;
      .schoolName {
        margin: 5px 0;
        font-size: 25px;
        color: rgba(24, 144, 255, 0.8);
      }
      .year {
        font-size: 15px;
        margin: 5px 0;
        color: rgba(24, 144, 255, 0.8);
      }
      .location {
        margin: 5px 0;
        font-size: 12px;
        color: rgba(24, 144, 255, 0.8);
      }
      .major {
        margin: 5px 0;
        color: rgba(24, 144, 255, 0.8);
      }
      .work {
        margin: 5px 0;
        color: #531dab;
        font-size: 20px;
      }
      .mail {
        margin: 5px 0;
        color: #531dab;
      }
      .sign {
        font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
        color: #1890ff;
        font-size: 22px;
        margin: 10px;
      }
    }
    .codeSummary {
      margin-top: 10px;
      .desc {
        font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
        font-size: 14px;
        margin-top: 20px;
      }
    }
  }
`
export default Info
