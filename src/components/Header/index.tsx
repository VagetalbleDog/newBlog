import {
  ReadOutlined,
  UnorderedListOutlined,
  MailOutlined,
  EditOutlined,
  UserOutlined,
  CheckCircleOutlined,
  SmileOutlined
} from '@ant-design/icons'
import { Affix, Drawer, MenuProps } from 'antd'
import React, { useState } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import Info from '../Info'
export default function HeaderNav({ isMobile }: any) {
  const [current, setCurrent] = useState('home')
  const [showAuthor, setShowAuthor] = useState<boolean>(false)
  const items: MenuProps['items'] = isMobile
    ? [
        {
          label: (
            <span
              onClick={() => {
                setShowAuthor(!showAuthor)
              }}
            >
              不认识一下作者嘛~
            </span>
          ),
          key: 'author',
          icon: <SmileOutlined />
        },
        {
          label: (
            <>
              <Link to="#">首页</Link>
            </>
          ),
          key: 'home',
          icon: <ReadOutlined />
        },
        {
          label: '申请管理员权限',
          key: 'require',
          icon: <MailOutlined />
        },
        {
          label: '我的账号',
          key: 'myDetail',
          icon: <UserOutlined />
        },
        {
          label: '发表文章',
          key: 'publish',
          icon: <EditOutlined />
        },
        {
          label: '按分类筛选文章',
          key: 'class',
          icon: <UnorderedListOutlined />,
          children: [
            {
              type: 'group',
              label: 'Item 1',
              children: [
                {
                  label: 'Option 1',
                  key: 'setting:1'
                },
                {
                  label: 'Option 2',
                  key: 'setting:2'
                }
              ]
            },
            {
              type: 'group',
              label: 'Item 2',
              children: [
                {
                  label: 'Option 3',
                  key: 'setting:3'
                },
                {
                  label: 'Option 4',
                  key: 'setting:4'
                }
              ]
            }
          ]
        },
        {
          label: (
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
              本站由antd提供支持
            </a>
          ),
          key: 'alipay',
          icon: <CheckCircleOutlined />
        }
      ]
    : [
        {
          label: (
            <>
              <Link to="#">首页</Link>
            </>
          ),
          key: 'home',
          icon: <ReadOutlined />
        },
        {
          label: '申请管理员权限',
          key: 'require',
          icon: <MailOutlined />
        },
        {
          label: '我的账号',
          key: 'myDetail',
          icon: <UserOutlined />
        },
        {
          label: '发表文章',
          key: 'publish',
          icon: <EditOutlined />
        },
        {
          label: '按分类筛选文章',
          key: 'class',
          icon: <UnorderedListOutlined />,
          children: [
            {
              type: 'group',
              label: 'Item 1',
              children: [
                {
                  label: 'Option 1',
                  key: 'setting:1'
                },
                {
                  label: 'Option 2',
                  key: 'setting:2'
                }
              ]
            },
            {
              type: 'group',
              label: 'Item 2',
              children: [
                {
                  label: 'Option 3',
                  key: 'setting:3'
                },
                {
                  label: 'Option 4',
                  key: 'setting:4'
                }
              ]
            }
          ]
        }
      ]
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }

  return (
    <>
      <Drawer
        placement="left"
        size="large"
        visible={showAuthor}
        onClose={() => {
          setShowAuthor(!showAuthor)
        }}
      >
        <Info />
      </Drawer>
      <Affix>
        <Menu
          theme="light"
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </Affix>
    </>
  )
}
