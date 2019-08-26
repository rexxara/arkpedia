/* tslint:disable*/
import React from 'react';
import { ScrollView, Text, View,Image} from 'react-native';
import { Tabs ,List} from '@ant-design/react-native';
import data from './src/arkData'
console.log(data)
const renderContent = (tab, index) => {
  const style = {
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#ddd',
  };
  const content = data.filter(i => i.level === tab.rank).map(i => {
    return (
      <View key={`${index}_${i}`}style={{ marginTop: 80, marginBottom: 10 }}>
        <Text>
          {i.type}---{i.name}
        </Text>
        <List>
        {i.tags.map((v,k)=><List.Item key={k}>{v}</List.Item>)}
        </List>
      </View>
    );
  })
  return <ScrollView style={{ backgroundColor: '#fff' }}>{content}</ScrollView>;
};



export default class BasicTabsExample extends React.Component {
  render() {
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
    return (
      <View style={{ flex: 1 }}>
          <View style={style}>
          <Image source={require('./src/imgs/title.png')} />
          </View>
        <View style={{ flex: 2 }}>
          <Tabs tabs={tabs2} initialPage={1} tabBarPosition="top">
            {renderContent}
          </Tabs>
        </View>
      </View>
    );
  }
}
export const title = 'Tabs';
export const description = 'Tabs example';