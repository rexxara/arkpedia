/* tslint:disable*/
import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { Tabs, List, Button, Flex, Drawer, WhiteSpace } from '@ant-design/react-native';
import { data, tags } from './src/arkData'
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


const renderContent = (tab, index) => {

  const content = data.filter(i => i.level === tab.rank).map(i => {
    return (
      <View key={`${index}_${i}`} style={{ marginTop: 80, marginBottom: 10 }}>
        <Text>
          {i.type}---{i.name}
        </Text>
        <List>
          {i.tags.map((v, k) => <List.Item key={k}>{v}</List.Item>)}
        </List>
      </View>
    );
  })
  return <ScrollView style={{ backgroundColor: '#fff' }}>{content}</ScrollView>;
};


export default class BasicTabsExample extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      tagsName: "资质",
      filters: []
    }
    this.onOpenChange = isOpen => {
      /* tslint:disable: no-console */
      console.log('是否打开了 Drawer', isOpen.toString());
    };
  }
  drawerhandle = (name) => {
    this.setState({ tagsName: name })
    this.drawer && this.drawer.openDrawer()
  }
  wifesRender(filters) {
    if (filters.length === 0) { return <Text /> }
    let res = data
    let flag = null

    filters.map((worker, k) => {
      if (worker.tagsName === "资质" || worker.tagsName === "词缀" || worker.tagsName === "位置") {
        res = res.filter((v, k) => v.tags.find((vv, kk) => vv === worker.value) ? true : false)
        //  flag=JSON.stringify(res[0])
      } else if (worker.tagsName === "性别") {
        res = res.filter((v, k) => v.sex === worker.value[0])
      } else if (worker.tagsName === "种类") {
        res = res.filter((v, k) => v.type === worker.value.slice(0, 2))
      }

    })
    if (flag) { return flag }
    return <List>
      {/* {filters.map(v=><Text>{v.value}--</Text>)} */}
      {res.map((v, k) => <List.Item key={v.name}>{v.name}</List.Item>)}
    </List>
  }
  render() {
    const { tagsName, filters } = this.state
    const sidebar = (
      <ScrollView style={[styles.container]}>
        <List>
          {tags.find((v) => v.name === tagsName).tags.map((v, k) => <List.Item
            onPress={() => {
              const value = v
              const { tagsName } = this.state
              if (filters.length >= 3) return alert(`当前选择了${filters.length}个标签`)
              if (filters.find(i => i.value === value)) {
                this.setState({ filters: filters.filter(i => i.value !== value) })
              } else {
                this.setState({ filters: [...filters, { tagsName, value }] })
              }
              this.drawer && this.drawer.closeDrawer()
            }}
            key={v}>{v}</List.Item>)}
        </List>
      </ScrollView>
    );
    const tabs2 = [
      { title: '2星', rank: 2 },
      { title: '3星', rank: 3 },
      { title: '4星', rank: 4 },
      { title: '5星', rank: 5 },
      { title: '6星', rank: 6 }
    ];
    const style = {
      alignItems: 'center',
      justifyContent: 'center',
      height: 150,
      backgroundColor: '#fff',
    };
    const tagStyle = {
      backgroundColor: '#fff',
      padding: 4,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    };
    const buttonStyle={
      width: 80, margin: 1
    }
    return (
      <Drawer
        sidebar={sidebar}
        position="left"
        open={false}
        drawerRef={el => (this.drawer = el)}
        onOpenChange={this.onOpenChange}
        drawerBackgroundColor="#ccc"
      >
        <View style={{ flex: 1 }}>
          <View style={style}>
            <Image source={require('./src/imgs/title.png')} />
          </View>
          <View style={tagStyle}>
            {tags.map((v, k) => <Button key={v.name} onPress={() => { this.drawerhandle(v.name) }} style={buttonStyle} type='primary'>{v.name}</Button>)}
          </View>
          <WhiteSpace />
          <View style={tagStyle}>
            {filters.map((v, k) => <Button style={{margin:1}} type='warning' onPress={() => { this.setState({ filters: filters.filter(i => i.value !== v.value) }) }} key={v.value}>{v.value}</Button>)}
          </View>
          {/* <View style={{ flex: 2 }}>
          <Tabs tabs={tabs2} initialPage={1} tabBarPosition="top">
            {renderContent}
          </Tabs>
        </View> */}
          <WhiteSpace />
          <ScrollView>
            {this.wifesRender(filters)}
          </ScrollView>
          <View>
            <Button type="warning" onPress={() => { this.setState({ filters: [] }) }}>Reset</Button>
          </View>
        </View>
      </Drawer>


    );
  }
}