/* SECTION: match-data
 * 内战赛数据文件（唯一数据源）。
 * 更新方式：把每天的战绩截图发给助理，由助理解析后更新本文件；
 * 也可以在网页管理页手动录入后点「导出数据」生成新的本文件替换。
 * 结构说明：players 为玩家名单（id 稳定不变），matches 为对局列表（按日期与时间排序）。
 */
window.WZRY_DATA = {
  meta: {
    title: '王者内战赛数据看板',
    teamName: '微信群内战',
    updatedAt: '2026-10-16',
    note: '数据来源：每日内战结算截图，由助理解析录入'
  },
  players: [
    { id: 'p01', name: '乐观善良娱乐', aliases: [], color: '#f5c542' },
    { id: 'p02', name: '满目春风及你', aliases: [], color: '#4fc3f7' },
    { id: 'p03', name: '黄翅鱼吃不吃', aliases: [], color: '#81c784' },
    { id: 'p04', name: '十一月之雨', aliases: [], color: '#ba68c8' },
    { id: 'p05', name: '02年迈无力', aliases: ['德布劳内', '17德布劳内'], color: '#ff8a65' },
    { id: 'p06', name: '违规昵称914678527321', aliases: [], color: '#e57373' },
    { id: 'p07', name: '镜的呢边是海', aliases: [], color: '#4db6ac' },
    { id: 'p08', name: '我听妳的话', aliases: [], color: '#9575cd' },
    { id: 'p09', name: 'hshsudnxbdi', aliases: [], color: '#a1887f' },
    { id: 'p10', name: '沧澜潇潇', aliases: [], color: '#64b5f6' },
    { id: 'p11', name: '云水墨言', aliases: [], color: '#f06292' },
    { id: 'p13', name: '小鱼冲丫', aliases: [], color: '#ffb74d' },
    { id: 'p14', name: '卧龙信长', aliases: [], color: '#4dd0e1' },
    { id: 'p15', name: '吴彦祖sss', aliases: [], color: '#dce775' },
    { id: 'p16', name: '哥、一枝独秀', aliases: [], color: '#ce93d8' },
    { id: 'p17', name: '索博斯洛伊', aliases: [], color: '#80deea' },
    { id: 'p18', name: '是你的裤裆哟', aliases: [], color: '#90a4ae' },
    { id: 'p19', name: '橙', aliases: [], color: '#ff7043' }
  ],
  matches: [
    {
      id: 'm20261012-1', date: '2026-10-12', time: '20:40', seq: 1, score: '30 : 20', winnerTeam: 'A',
      teams: { A: ['p04', 'p03', 'p13', 'p02', 'p16'], B: ['p01', 'p14', 'p08', 'p10', 'p06'] },
      records: [
        { player: 'p04', hero: '蚩', lane: '对抗路', k: 11, d: 5, a: 7, score: 11.6, gold: 13162, mvp: null, win: true, medal: '银牌对抗路' },
        { player: 'p03', hero: '不知火舞', lane: '中路', k: 5, d: 5, a: 8, score: 9.0, gold: 12707, mvp: null, win: true, medal: '' },
        { player: 'p13', hero: '孙权', lane: '中路', k: 5, d: 2, a: 11, score: 7.4, gold: 12308, mvp: null, win: true, medal: '' },
        { player: 'p02', hero: '猪八戒', lane: '打野', k: 8, d: 3, a: 16, score: 11.9, gold: 14148, mvp: 'win', win: true, medal: '银牌打野' },
        { player: 'p16', hero: '东皇太一', lane: '游走', k: 1, d: 5, a: 21, score: 8.1, gold: 9916, mvp: null, win: true, medal: '' },
        { player: 'p01', hero: '司空震', lane: '打野', k: 5, d: 8, a: 8, score: 9.1, gold: 11936, mvp: 'lose', win: false, medal: '' },
        { player: 'p14', hero: '嬴政', lane: '中路', k: 2, d: 3, a: 10, score: 6.7, gold: 11118, mvp: null, win: false, medal: '' },
        { player: 'p08', hero: '狄仁杰', lane: '发育路', k: 6, d: 6, a: 8, score: 8.2, gold: 12458, mvp: null, win: false, medal: '' },
        { player: 'p10', hero: '芈月', lane: '对抗路', k: 4, d: 8, a: 7, score: 8.1, gold: 11287, mvp: null, win: false, medal: '' },
        { player: 'p06', hero: '廉颇', lane: '对抗路', k: 3, d: 5, a: 9, score: 7.2, gold: 10475, mvp: null, win: false, medal: '' }
      ]
    },
    {
      id: 'm20261012-2', date: '2026-10-12', time: '21:09', seq: 2, score: '14 : 3', winnerTeam: 'A',
      teams: { A: ['p01', 'p10', 'p13', 'p04', 'p06'], B: ['p02', 'p14', 'p03', 'p16', 'p08'] },
      records: [
        { player: 'p01', hero: '曜', lane: '打野', k: 3, d: 0, a: 4, score: 8.9, gold: 6652, mvp: null, win: true, medal: '' },
        { player: 'p10', hero: '项羽', lane: '对抗路', k: 4, d: 2, a: 5, score: 8.1, gold: 5469, mvp: null, win: true, medal: '' },
        { player: 'p13', hero: '不知火舞', lane: '中路', k: 1, d: 0, a: 7, score: 8.7, gold: 5832, mvp: null, win: true, medal: '' },
        { player: 'p04', hero: '戈娅', lane: '发育路', k: 5, d: 0, a: 5, score: 11.8, gold: 7042, mvp: 'win', win: true, medal: '银牌发育路' },
        { player: 'p06', hero: '张飞', lane: '游走', k: 1, d: 1, a: 9, score: 7.8, gold: 4647, mvp: null, win: true, medal: '' },
        { player: 'p02', hero: '赵云', lane: '打野', k: 1, d: 2, a: 0, score: 3.6, gold: 5194, mvp: null, win: false, medal: '' },
        { player: 'p14', hero: '兰陵王', lane: '打野', k: 0, d: 3, a: 1, score: 3.1, gold: 3618, mvp: null, win: false, medal: '' },
        { player: 'p03', hero: '周瑜', lane: '中路', k: 0, d: 3, a: 0, score: 3.5, gold: 4651, mvp: null, win: false, medal: '' },
        { player: 'p16', hero: '虞姬', lane: '发育路', k: 2, d: 4, a: 0, score: 3.7, gold: 4168, mvp: null, win: false, medal: '' },
        { player: 'p08', hero: '钟馗', lane: '游走', k: 0, d: 2, a: 1, score: 2.9, gold: 3665, mvp: null, win: false, medal: '' }
      ]
    },
    {
      id: 'm20261012-3', date: '2026-10-12', time: '21:27', seq: 3, score: '33 : 26', winnerTeam: 'A',
      teams: { A: ['p01', 'p02', 'p04', 'p08', 'p16'], B: ['p06', 'p13', 'p03', 'p10', 'p14'] },
      records: [
        { player: 'p01', hero: '镜', lane: '打野', k: 12, d: 4, a: 9, score: 11.5, gold: 16706, mvp: 'win', win: true, medal: '银牌打野' },
        { player: 'p02', hero: '夏洛特', lane: '对抗路', k: 8, d: 7, a: 11, score: 10.3, gold: 12415, mvp: null, win: true, medal: '银牌对抗路' },
        { player: 'p04', hero: '妲己', lane: '中路', k: 5, d: 5, a: 11, score: 9.9, gold: 12330, mvp: null, win: true, medal: '铜牌中路' },
        { player: 'p08', hero: '虞姬', lane: '发育路', k: 7, d: 5, a: 6, score: 7.2, gold: 13468, mvp: null, win: true, medal: '' },
        { player: 'p16', hero: '蔡文姬', lane: '游走', k: 1, d: 5, a: 17, score: 6.4, gold: 10039, mvp: null, win: true, medal: '' },
        { player: 'p06', hero: '铠', lane: '打野', k: 6, d: 5, a: 8, score: 7.9, gold: 11222, mvp: null, win: false, medal: '' },
        { player: 'p13', hero: '关羽', lane: '对抗路', k: 7, d: 8, a: 8, score: 8.4, gold: 11961, mvp: null, win: false, medal: '' },
        { player: 'p03', hero: '沈梦溪', lane: '中路', k: 6, d: 8, a: 8, score: 7.7, gold: 11969, mvp: null, win: false, medal: '' },
        { player: 'p10', hero: '百里守约', lane: '发育路', k: 4, d: 7, a: 7, score: 6.6, gold: 12720, mvp: null, win: false, medal: '' },
        { player: 'p14', hero: '东皇太一', lane: '游走', k: 3, d: 5, a: 14, score: 8.9, gold: 10881, mvp: 'lose', win: false, medal: '' }
      ]
    },
    {
      id: 'm20261013-1', date: '2026-10-13', time: '20:30', seq: 1, score: '34 : 33', winnerTeam: 'A',
      teams: { A: ['p11', 'p06', 'p05', 'p10', 'p07'], B: ['p13', 'p14', 'p02', 'p17', 'p08'] },
      records: [
        { player: 'p11', hero: '孙悟空', lane: '打野', k: 7, d: 11, a: 4, score: 6.4, gold: 13727, mvp: null, win: true, medal: '' },
        { player: 'p06', hero: '吕布', lane: '对抗路', k: 1, d: 6, a: 7, score: 6.0, gold: 12886, mvp: null, win: true, medal: '' },
        { player: 'p05', hero: '沈梦溪', lane: '中路', k: 17, d: 2, a: 9, score: 14.5, gold: 20554, mvp: 'win', win: true, medal: '金牌中路' },
        { player: 'p10', hero: '百里守约', lane: '发育路', k: 7, d: 9, a: 14, score: 9.0, gold: 16598, mvp: null, win: true, medal: '' },
        { player: 'p07', hero: '鲁班大师', lane: '游走', k: 2, d: 5, a: 17, score: 6.2, gold: 12410, mvp: null, win: true, medal: '' },
        { player: 'p13', hero: '露娜', lane: '打野', k: 2, d: 8, a: 8, score: 5.8, gold: 14868, mvp: null, win: false, medal: '' },
        { player: 'p14', hero: '程咬金', lane: '对抗路', k: 0, d: 5, a: 14, score: 6.9, gold: 14402, mvp: null, win: false, medal: '' },
        { player: 'p02', hero: '女娲', lane: '中路', k: 9, d: 10, a: 11, score: 7.9, gold: 15635, mvp: null, win: false, medal: '' },
        { player: 'p17', hero: '蒙犽', lane: '发育路', k: 15, d: 5, a: 11, score: 12.0, gold: 19005, mvp: 'lose', win: false, medal: '银牌发育路' },
        { player: 'p08', hero: '扁鹊', lane: '中路', k: 7, d: 6, a: 20, score: 8.8, gold: 13532, mvp: null, win: false, medal: '' }
      ]
    },
    {
      id: 'm20261013-2', date: '2026-10-13', time: '21:05', seq: 2, score: '14 : 6', winnerTeam: 'A',
      teams: { A: ['p13', 'p02', 'p17', 'p05', 'p06'], B: ['p14', 'p11', 'p10', 'p08', 'p07'] },
      records: [
        { player: 'p13', hero: '老夫子', lane: '对抗路', k: 1, d: 3, a: 4, score: 7.2, gold: 5488, mvp: null, win: true, medal: '' },
        { player: 'p02', hero: '干将莫邪', lane: '中路', k: 4, d: 0, a: 6, score: 10.4, gold: 7513, mvp: null, win: true, medal: '铜牌中路' },
        { player: 'p17', hero: '苍', lane: '发育路', k: 2, d: 1, a: 5, score: 8.8, gold: 6419, mvp: null, win: true, medal: '' },
        { player: 'p05', hero: '马超', lane: '打野', k: 7, d: 1, a: 4, score: 11.1, gold: 8060, mvp: 'win', win: true, medal: '银牌打野' },
        { player: 'p06', hero: '张飞', lane: '游走', k: 0, d: 1, a: 6, score: 4.9, gold: 4540, mvp: null, win: true, medal: '' },
        { player: 'p14', hero: '刘邦', lane: '对抗路', k: 0, d: 2, a: 5, score: 4.9, gold: 4592, mvp: null, win: false, medal: '' },
        { player: 'p11', hero: '貂蝉', lane: '中路', k: 1, d: 4, a: 0, score: 4.8, gold: 4642, mvp: null, win: false, medal: '' },
        { player: 'p10', hero: '百里守约', lane: '发育路', k: 0, d: 3, a: 2, score: 5.5, gold: 4868, mvp: null, win: false, medal: '' },
        { player: 'p08', hero: '赵云', lane: '打野', k: 5, d: 2, a: 0, score: 6.9, gold: 4774, mvp: 'lose', win: false, medal: '' },
        { player: 'p07', hero: '瑶', lane: '游走', k: 0, d: 3, a: 1, score: 2.3, gold: 3408, mvp: null, win: false, medal: '' }
      ]
    },
    {
      id: 'm20261014-1', date: '2026-10-14', time: '20:12', seq: 1, score: '18 : 11', winnerTeam: 'A',
      teams: { A: ['p05', 'p15', 'p07', 'p14', 'p06'], B: ['p01', 'p13', 'p10', 'p02', 'p08'] },
      records: [
        { player: 'p05', hero: '杨玉环', lane: '中路', k: 5, d: 1, a: 8, score: 12.6, gold: 10704, mvp: 'win', win: true, medal: '金牌中路' },
        { player: 'p15', hero: '白起', lane: '对抗路', k: 4, d: 4, a: 4, score: 8.8, gold: 9183, mvp: null, win: true, medal: '' },
        { player: 'p07', hero: '孙尚香', lane: '发育路', k: 3, d: 2, a: 9, score: 8.8, gold: 8539, mvp: null, win: true, medal: '' },
        { player: 'p14', hero: '杨戬', lane: '对抗路', k: 4, d: 2, a: 5, score: 7.6, gold: 8383, mvp: null, win: true, medal: '' },
        { player: 'p06', hero: '墨子', lane: '中路', k: 2, d: 2, a: 11, score: 8.7, gold: 7925, mvp: null, win: true, medal: '' },
        { player: 'p01', hero: '安琪拉', lane: '中路', k: 2, d: 4, a: 6, score: 7.9, gold: 7810, mvp: null, win: false, medal: '' },
        { player: 'p13', hero: '狂铁', lane: '打野', k: 2, d: 3, a: 5, score: 8.6, gold: 7356, mvp: null, win: false, medal: '' },
        { player: 'p10', hero: '百里守约', lane: '发育路', k: 0, d: 4, a: 2, score: 5.1, gold: 7437, mvp: null, win: false, medal: '' },
        { player: 'p02', hero: '大司命', lane: '打野', k: 6, d: 5, a: 4, score: 9.8, gold: 8912, mvp: 'lose', win: false, medal: '' },
        { player: 'p08', hero: '刘禅', lane: '游走', k: 1, d: 2, a: 8, score: 9.7, gold: 6276, mvp: null, win: false, medal: '铜牌游走' }
      ]
    },
    {
      id: 'm20261014-2', date: '2026-10-14', time: '20:35', seq: 2, score: '20 : 14', winnerTeam: 'A',
      teams: { A: ['p01', 'p10', 'p13', 'p02', 'p07'], B: ['p08', 'p15', 'p14', 'p05', 'p06'] },
      records: [
        { player: 'p01', hero: '貂蝉', lane: '中路', k: 9, d: 3, a: 9, score: 14.1, gold: 11129, mvp: 'win', win: true, medal: '金牌中路' },
        { player: 'p10', hero: '程咬金', lane: '对抗路', k: 1, d: 2, a: 1, score: 5.4, gold: 10462, mvp: null, win: true, medal: '' },
        { player: 'p13', hero: '孙权', lane: '中路', k: 0, d: 4, a: 7, score: 4.5, gold: 8462, mvp: null, win: true, medal: '' },
        { player: 'p02', hero: '云缨', lane: '打野', k: 8, d: 4, a: 5, score: 8.8, gold: 11711, mvp: null, win: true, medal: '' },
        { player: 'p07', hero: '鲁班大师', lane: '游走', k: 2, d: 1, a: 12, score: 6.4, gold: 8345, mvp: null, win: true, medal: '' },
        { player: 'p08', hero: '弈星', lane: '中路', k: 4, d: 4, a: 7, score: 8.1, gold: 9734, mvp: null, win: false, medal: '' },
        { player: 'p15', hero: '猪八戒', lane: '打野', k: 4, d: 4, a: 2, score: 9.2, gold: 9675, mvp: 'lose', win: false, medal: '' },
        { player: 'p14', hero: '百里守约', lane: '发育路', k: 2, d: 4, a: 4, score: 4.7, gold: 7532, mvp: null, win: false, medal: '' },
        { player: 'p05', hero: '马超', lane: '打野', k: 4, d: 4, a: 5, score: 7.3, gold: 10788, mvp: null, win: false, medal: '' },
        { player: 'p06', hero: '廉颇', lane: '对抗路', k: 0, d: 4, a: 10, score: 6.6, gold: 7247, mvp: null, win: false, medal: '' }
      ]
    },
    {
      id: 'm20261014-3', date: '2026-10-14', time: '20:59', seq: 3, score: '21 : 15', winnerTeam: 'A',
      teams: { A: ['p01', 'p14', 'p13', 'p02', 'p06'], B: ['p10', 'p08', 'p15', 'p05', 'p07'] },
      records: [
        { player: 'p01', hero: '狂铁', lane: '对抗路', k: 3, d: 2, a: 12, score: 12.2, gold: 11361, mvp: 'win', win: true, medal: '金牌对抗路' },
        { player: 'p14', hero: '嬴政', lane: '中路', k: 4, d: 4, a: 7, score: 5.5, gold: 12027, mvp: null, win: true, medal: '' },
        { player: 'p13', hero: '敖隐', lane: '发育路', k: 9, d: 1, a: 6, score: 11.9, gold: 13587, mvp: null, win: true, medal: '银牌发育路' },
        { player: 'p02', hero: '哪吒', lane: '对抗路', k: 4, d: 5, a: 12, score: 7.5, gold: 11837, mvp: null, win: true, medal: '' },
        { player: 'p06', hero: '墨子', lane: '中路', k: 1, d: 3, a: 13, score: 7.4, gold: 10089, mvp: null, win: true, medal: '' },
        { player: 'p10', hero: '钟无艳', lane: '对抗路', k: 4, d: 6, a: 4, score: 9.4, gold: 11521, mvp: null, win: false, medal: '' },
        { player: 'p08', hero: '米莱狄', lane: '中路', k: 3, d: 3, a: 6, score: 9.7, gold: 11878, mvp: null, win: false, medal: '铜牌中路' },
        { player: 'p15', hero: '蚩奼', lane: '对抗路', k: 1, d: 6, a: 3, score: 6.0, gold: 10425, mvp: null, win: false, medal: '' },
        { player: 'p05', hero: '赵云', lane: '打野', k: 6, d: 3, a: 6, score: 9.9, gold: 13568, mvp: 'lose', win: false, medal: '' },
        { player: 'p07', hero: '鲁班大师', lane: '游走', k: 1, d: 3, a: 7, score: 5.5, gold: 8877, mvp: null, win: false, medal: '' }
      ]
    },
    {
      id: 'm20261014-4', date: '2026-10-14', time: '21:28', seq: 4, score: '14 : 2', winnerTeam: 'A',
      teams: { A: ['p15', 'p13', 'p10', 'p05', 'p07'], B: ['p01', 'p06', 'p08', 'p02', 'p14'] },
      records: [
        { player: 'p15', hero: '猪八戒', lane: '打野', k: 2, d: 0, a: 3, score: 8.7, gold: 5903, mvp: null, win: true, medal: '' },
        { player: 'p13', hero: '不知火舞', lane: '中路', k: 3, d: 0, a: 8, score: 12.3, gold: 6344, mvp: 'win', win: true, medal: '金牌中路' },
        { player: 'p10', hero: '百里守约', lane: '发育路', k: 1, d: 1, a: 1, score: 4.8, gold: 5118, mvp: null, win: true, medal: '' },
        { player: 'p05', hero: '阿古朵', lane: '打野', k: 7, d: 0, a: 3, score: 10.7, gold: 6581, mvp: null, win: true, medal: '' },
        { player: 'p07', hero: '鲁班大师', lane: '游走', k: 1, d: 1, a: 8, score: 6.4, gold: 4079, mvp: null, win: true, medal: '' },
        { player: 'p01', hero: '夏洛特', lane: '对抗路', k: 0, d: 3, a: 0, score: 4.1, gold: 4973, mvp: null, win: false, medal: '' },
        { player: 'p06', hero: '海诺', lane: '对抗路', k: 0, d: 4, a: 0, score: 2.8, gold: 3874, mvp: null, win: false, medal: '' },
        { player: 'p08', hero: '虞姬', lane: '发育路', k: 1, d: 3, a: 1, score: 3.2, gold: 4753, mvp: null, win: false, medal: '' },
        { player: 'p02', hero: '诸葛亮', lane: '中路', k: 1, d: 2, a: 0, score: 3.7, gold: 5046, mvp: null, win: false, medal: '' },
        { player: 'p14', hero: '东皇太一', lane: '游走', k: 0, d: 2, a: 0, score: 2.8, gold: 2989, mvp: null, win: false, medal: '' }
      ]
    },
    {
      id: 'm20261014-5', date: '2026-10-14', time: '21:43', seq: 5, score: '30 : 13', winnerTeam: 'A',
      teams: { A: ['p02', 'p15', 'p13', 'p08', 'p14'], B: ['p01', 'p05', 'p10', 'p06', 'p07'] },
      records: [
        { player: 'p02', hero: '干将莫邪', lane: '中路', k: 11, d: 2, a: 6, score: 13.0, gold: 12759, mvp: 'win', win: true, medal: '金牌中路' },
        { player: 'p15', hero: '白起', lane: '对抗路', k: 4, d: 2, a: 4, score: 6.4, gold: 9539, mvp: null, win: true, medal: '' },
        { player: 'p13', hero: '公孙离', lane: '发育路', k: 7, d: 4, a: 9, score: 9.4, gold: 11049, mvp: null, win: true, medal: '' },
        { player: 'p08', hero: '娜可露露', lane: '打野', k: 6, d: 3, a: 4, score: 7.3, gold: 10176, mvp: null, win: true, medal: '' },
        { player: 'p14', hero: '张飞', lane: '游走', k: 2, d: 2, a: 15, score: 8.1, gold: 9219, mvp: null, win: true, medal: '' },
        { player: 'p01', hero: '不知火舞', lane: '中路', k: 2, d: 6, a: 1, score: 4.8, gold: 8512, mvp: null, win: false, medal: '' },
        { player: 'p05', hero: '关羽', lane: '对抗路', k: 2, d: 5, a: 3, score: 6.2, gold: 9049, mvp: null, win: false, medal: '' },
        { player: 'p10', hero: '马可波罗', lane: '发育路', k: 6, d: 8, a: 3, score: 7.9, gold: 11040, mvp: 'lose', win: false, medal: '' },
        { player: 'p06', hero: '铠', lane: '打野', k: 3, d: 8, a: 4, score: 6.3, gold: 8653, mvp: null, win: false, medal: '' },
        { player: 'p07', hero: '鲁班大师', lane: '游走', k: 0, d: 3, a: 9, score: 7.0, gold: 7795, mvp: null, win: false, medal: '' }
      ]
    },
    {
      id: 'm20261015-1', date: '2026-10-15', time: '20:09', seq: 1, score: '34 : 22', winnerTeam: 'A',
      teams: { A: ['p01', 'p04', 'p03', 'p08', 'p07'], B: ['p05', 'p06', 'p02', 'p10', 'p09'] },
      records: [
        { player: 'p01', hero: '镜', lane: '打野', k: 5, d: 8, a: 8, score: 6.9, gold: 14452, mvp: null, win: true, medal: '' },
        { player: 'p04', hero: '蚩奼', lane: '对抗路', k: 14, d: 3, a: 8, score: 14.2, gold: 17004, mvp: 'win', win: true, medal: '金牌对抗路' },
        { player: 'p03', hero: '沈梦溪', lane: '中路', k: 5, d: 6, a: 19, score: 8.0, gold: 11730, mvp: null, win: true, medal: '' },
        { player: 'p08', hero: '李元芳', lane: '发育路', k: 8, d: 3, a: 21, score: 10.8, gold: 15558, mvp: null, win: true, medal: '铜牌发育路' },
        { player: 'p07', hero: '鲁班大师', lane: '游走', k: 2, d: 2, a: 28, score: 9.3, gold: 11403, mvp: null, win: true, medal: '' },
        { player: 'p05', hero: '娜可露露', lane: '打野', k: 14, d: 5, a: 1, score: 10.0, gold: 14561, mvp: 'lose', win: false, medal: '' },
        { player: 'p06', hero: '廉颇', lane: '对抗路', k: 0, d: 10, a: 4, score: 3.1, gold: 9528, mvp: null, win: false, medal: '' },
        { player: 'p02', hero: '不知火舞', lane: '中路', k: 3, d: 3, a: 8, score: 8.3, gold: 15025, mvp: null, win: false, medal: '' },
        { player: 'p10', hero: '鲁班七号', lane: '发育路', k: 3, d: 9, a: 8, score: 8.5, gold: 13355, mvp: null, win: false, medal: '' },
        { player: 'p09', hero: '盾山', lane: '游走', k: 2, d: 7, a: 7, score: 6.7, gold: 9534, mvp: null, win: false, medal: '' }
      ]
    },
    {
      id: 'm20261015-2', date: '2026-10-15', time: '20:39', seq: 2, score: '15 : 7', winnerTeam: 'A',
      teams: { A: ['p01', 'p02', 'p03', 'p04', 'p05'], B: ['p06', 'p07', 'p08', 'p09', 'p10'] },
      records: [
        { player: 'p01', hero: '钟馗', lane: '游走', k: 3, d: 0, a: 8, score: 10.7, gold: 5731, mvp: 'win', win: true, medal: '银牌游走' },
        { player: 'p02', hero: '橘右京', lane: '对抗路', k: 1, d: 2, a: 6, score: 7.9, gold: 6687, mvp: null, win: true, medal: '' },
        { player: 'p03', hero: '海月', lane: '中路', k: 1, d: 3, a: 9, score: 7.5, gold: 6015, mvp: null, win: true, medal: '' },
        { player: 'p04', hero: '虞姬', lane: '发育路', k: 4, d: 1, a: 4, score: 9.9, gold: 7516, mvp: null, win: true, medal: '' },
        { player: 'p05', hero: '大司命', lane: '打野', k: 6, d: 1, a: 1, score: 7.6, gold: 7595, mvp: null, win: true, medal: '' },
        { player: 'p06', hero: '张飞', lane: '游走', k: 0, d: 3, a: 2, score: 4.5, gold: 4842, mvp: null, win: false, medal: '' },
        { player: 'p07', hero: '苏烈', lane: '游走', k: 1, d: 3, a: 2, score: 5.3, gold: 4994, mvp: null, win: false, medal: '' },
        { player: 'p08', hero: '扁鹊', lane: '中路', k: 3, d: 4, a: 2, score: 6.5, gold: 6796, mvp: 'lose', win: false, medal: '' },
        { player: 'p09', hero: '敖隐', lane: '发育路', k: 1, d: 3, a: 0, score: 3.8, gold: 5782, mvp: null, win: false, medal: '' },
        { player: 'p10', hero: '赵云', lane: '打野', k: 2, d: 2, a: 1, score: 5.6, gold: 7416, mvp: null, win: false, medal: '' }
      ]
    },
    {
      id: 'm20261015-3', date: '2026-10-15', time: '21:04', seq: 3, score: '19 : 14', winnerTeam: 'A',
      teams: { A: ['p04', 'p09', 'p06', 'p17', 'p07'], B: ['p01', 'p10', 'p05', 'p08', 'p02'] },
      records: [
        { player: 'p04', hero: '心魔六耳', lane: '打野', k: 7, d: 4, a: 4, score: 8.8, gold: 11291, mvp: null, win: true, medal: '' },
        { player: 'p09', hero: '司空震', lane: '打野', k: 0, d: 3, a: 13, score: 7.6, gold: 11600, mvp: null, win: true, medal: '' },
        { player: 'p06', hero: '墨子', lane: '中路', k: 1, d: 5, a: 7, score: 6.5, gold: 8689, mvp: null, win: true, medal: '' },
        { player: 'p17', hero: '艾琳', lane: '发育路', k: 9, d: 1, a: 5, score: 13.1, gold: 13785, mvp: 'win', win: true, medal: '金牌发育路' },
        { player: 'p07', hero: '庄周', lane: '游走', k: 2, d: 1, a: 13, score: 9.5, gold: 8297, mvp: null, win: true, medal: '' },
        { player: 'p01', hero: '杨戬', lane: '对抗路', k: 1, d: 5, a: 6, score: 5.0, gold: 8648, mvp: null, win: false, medal: '' },
        { player: 'p10', hero: '夏侯惇', lane: '对抗路', k: 2, d: 4, a: 3, score: 6.2, gold: 8554, mvp: null, win: false, medal: '' },
        { player: 'p05', hero: '沈梦溪', lane: '中路', k: 5, d: 3, a: 5, score: 12.1, gold: 10625, mvp: 'lose', win: false, medal: '银牌中路' },
        { player: 'p08', hero: '狄仁杰', lane: '发育路', k: 2, d: 4, a: 1, score: 4.8, gold: 9568, mvp: null, win: false, medal: '' },
        { player: 'p02', hero: '鲁班大师', lane: '游走', k: 4, d: 3, a: 7, score: 8.1, gold: 7913, mvp: null, win: false, medal: '' }
      ]
    },
    {
      id: 'm20261015-4', date: '2026-10-15', time: '21:27', seq: 4, score: '27 : 22', winnerTeam: 'A',
      teams: { A: ['p17', 'p06', 'p10', 'p02', 'p07'], B: ['p01', 'p09', 'p05', 'p04', 'p08'] },
      records: [
        { player: 'p17', hero: '虞姬', lane: '发育路', k: 13, d: 3, a: 9, score: 13.6, gold: 19434, mvp: 'win', win: true, medal: '金牌发育路' },
        { player: 'p06', hero: '海诺', lane: '对抗路', k: 2, d: 6, a: 2, score: 4.8, gold: 12701, mvp: null, win: true, medal: '' },
        { player: 'p10', hero: '武则天', lane: '中路', k: 1, d: 7, a: 11, score: 5.9, gold: 12391, mvp: null, win: true, medal: '' },
        { player: 'p02', hero: '刘备', lane: '打野', k: 8, d: 3, a: 9, score: 8.3, gold: 17613, mvp: null, win: true, medal: '' },
        { player: 'p07', hero: '鲁班大师', lane: '游走', k: 3, d: 3, a: 12, score: 6.4, gold: 11244, mvp: null, win: true, medal: '' },
        { player: 'p01', hero: '元流之子', lane: '打野', k: 5, d: 4, a: 9, score: 9.8, gold: 15654, mvp: null, win: false, medal: '' },
        { player: 'p09', hero: '狂铁', lane: '对抗路', k: 3, d: 6, a: 11, score: 8.1, gold: 13562, mvp: null, win: false, medal: '' },
        { player: 'p05', hero: '貂蝉', lane: '中路', k: 8, d: 6, a: 9, score: 10.7, gold: 15780, mvp: 'lose', win: false, medal: '银牌中路' },
        { player: 'p04', hero: '赵云', lane: '打野', k: 2, d: 5, a: 11, score: 5.7, gold: 13507, mvp: null, win: false, medal: '' },
        { player: 'p08', hero: '扁鹊', lane: '中路', k: 4, d: 6, a: 17, score: 8.5, gold: 12352, mvp: null, win: false, medal: '' }
      ]
    },
    {
      id: 'm20261016-1', date: '2026-10-16', time: '20:20', seq: 1, score: '18 : 12', winnerTeam: 'A',
      teams: { A: ['p01', 'p05', 'p10', 'p02', 'p03'], B: ['p08', 'p18', 'p17', 'p06', 'p07'] },
      records: [
        { player: 'p01', hero: '老夫子', lane: '对抗路', k: 5, d: 2, a: 4, score: 12.2, gold: 9757, mvp: null, win: true, medal: '金牌对抗路' },
        { player: 'p05', hero: '海月', lane: '中路', k: 5, d: 1, a: 10, score: 12.4, gold: 9320, mvp: 'win', win: true, medal: '金牌中路' },
        { player: 'p10', hero: '鲁班七号', lane: '发育路', k: 2, d: 4, a: 7, score: 9.8, gold: 8275, mvp: null, win: true, medal: '' },
        { player: 'p02', hero: '赵云', lane: '打野', k: 5, d: 2, a: 3, score: 8.0, gold: 9069, mvp: null, win: true, medal: '' },
        { player: 'p03', hero: '张飞', lane: '游走', k: 1, d: 3, a: 9, score: 8.0, gold: 6863, mvp: null, win: true, medal: '' },
        { player: 'p08', hero: '白起', lane: '对抗路', k: 1, d: 3, a: 6, score: 5.9, gold: 7252, mvp: null, win: false, medal: '' },
        { player: 'p18', hero: '不知火舞', lane: '中路', k: 3, d: 6, a: 6, score: 8.3, gold: 6817, mvp: 'lose', win: false, medal: '' },
        { player: 'p17', hero: '苍', lane: '发育路', k: 4, d: 3, a: 3, score: 7.9, gold: 8422, mvp: null, win: false, medal: '' },
        { player: 'p06', hero: '铠', lane: '打野', k: 4, d: 5, a: 4, score: 6.5, gold: 7540, mvp: null, win: false, medal: '' },
        { player: 'p07', hero: '鲁班大师', lane: '游走', k: 0, d: 1, a: 8, score: 8.1, gold: 6256, mvp: null, win: false, medal: '' }
      ]
    },
    {
      id: 'm20261016-2', date: '2026-10-16', time: '20:43', seq: 2, score: '21 : 11', winnerTeam: 'A',
      teams: { A: ['p01', 'p18', 'p10', 'p02', 'p03'], B: ['p08', 'p06', 'p07', 'p17', 'p05'] },
      records: [
        { player: 'p01', hero: '赵云', lane: '打野', k: 9, d: 1, a: 6, score: 11.7, gold: 12574, mvp: null, win: true, medal: '银牌打野' },
        { player: 'p18', hero: '关羽', lane: '对抗路', k: 3, d: 3, a: 5, score: 7.3, gold: 9385, mvp: null, win: true, medal: '' },
        { player: 'p10', hero: '武则天', lane: '中路', k: 4, d: 4, a: 10, score: 9.7, gold: 10065, mvp: null, win: true, medal: '' },
        { player: 'p02', hero: '百里守约', lane: '发育路', k: 5, d: 1, a: 8, score: 12.1, gold: 12192, mvp: 'win', win: true, medal: '银牌发育路' },
        { player: 'p03', hero: '张飞', lane: '游走', k: 0, d: 2, a: 11, score: 7.1, gold: 8190, mvp: null, win: true, medal: '' },
        { player: 'p08', hero: '百里玄策', lane: '打野', k: 1, d: 6, a: 4, score: 4.5, gold: 8784, mvp: null, win: false, medal: '' },
        { player: 'p06', hero: '东皇太一', lane: '对抗路', k: 0, d: 4, a: 4, score: 5.6, gold: 8348, mvp: null, win: false, medal: '' },
        { player: 'p07', hero: '王昭君', lane: '中路', k: 1, d: 5, a: 5, score: 5.9, gold: 8370, mvp: null, win: false, medal: '' },
        { player: 'p17', hero: '艾琳', lane: '发育路', k: 8, d: 3, a: 2, score: 11.1, gold: 13199, mvp: 'lose', win: false, medal: '银牌发育路' },
        { player: 'p05', hero: '太乙真人', lane: '游走', k: 1, d: 3, a: 8, score: 9.2, gold: 7890, mvp: null, win: false, medal: '' }
      ]
    },
    {
      id: 'm20261016-3', date: '2026-10-16', time: '21:07', seq: 3, score: '31 : 27', winnerTeam: 'B',
      teams: { A: ['p06', 'p02', 'p03', 'p17', 'p07'], B: ['p01', 'p05', 'p08', 'p18', 'p10'] },
      records: [
        { player: 'p06', hero: '铠', lane: '打野', k: 7, d: 5, a: 14, score: 7.8, gold: 14261, mvp: null, win: false, medal: '' },
        { player: 'p02', hero: '猪八戒', lane: '对抗路', k: 5, d: 6, a: 13, score: 7.9, gold: 13902, mvp: null, win: false, medal: '' },
        { player: 'p03', hero: '高渐离', lane: '中路', k: 7, d: 5, a: 8, score: 7.4, gold: 14295, mvp: null, win: false, medal: '' },
        { player: 'p17', hero: '黄忠', lane: '发育路', k: 8, d: 5, a: 14, score: 10.9, gold: 17276, mvp: 'lose', win: false, medal: '铜牌发育路' },
        { player: 'p07', hero: '少司缘', lane: '游走', k: 4, d: 6, a: 22, score: 9.7, gold: 12677, mvp: null, win: false, medal: '铜牌游走' },
        { player: 'p01', hero: '镜', lane: '打野', k: 4, d: 7, a: 15, score: 8.5, gold: 13812, mvp: null, win: true, medal: '' },
        { player: 'p05', hero: '貂蝉', lane: '中路', k: 5, d: 3, a: 15, score: 11.1, gold: 15830, mvp: 'win', win: true, medal: '银牌对抗路' },
        { player: 'p08', hero: '弈星', lane: '中路', k: 6, d: 3, a: 8, score: 6.7, gold: 14043, mvp: null, win: true, medal: '' },
        { player: 'p18', hero: '公孙离', lane: '发育路', k: 8, d: 9, a: 7, score: 7.2, gold: 12993, mvp: null, win: true, medal: '' },
        { player: 'p10', hero: '廉颇', lane: '对抗路', k: 4, d: 9, a: 6, score: 5.5, gold: 11770, mvp: null, win: true, medal: '' }
      ]
    },
    {
      id: 'm20261016-4', date: '2026-10-16', time: '21:36', seq: 4, score: '5 : 21', winnerTeam: 'B',
      teams: { A: ['p01', 'p10', 'p07', 'p18', 'p06'], B: ['p08', 'p02', 'p17', 'p05', 'p03'] },
      records: [
        { player: 'p01', hero: '干将莫邪', lane: '中路', k: 0, d: 4, a: 2, score: 5.4, gold: 6168, mvp: null, win: false, medal: '' },
        { player: 'p10', hero: '夏侯惇', lane: '对抗路', k: 0, d: 4, a: 3, score: 5.4, gold: 5702, mvp: null, win: false, medal: '' },
        { player: 'p07', hero: '虞姬', lane: '发育路', k: 2, d: 4, a: 2, score: 5.5, gold: 7080, mvp: 'lose', win: false, medal: '' },
        { player: 'p18', hero: '娜可露露', lane: '打野', k: 3, d: 5, a: 0, score: 4.3, gold: 6074, mvp: null, win: false, medal: '' },
        { player: 'p06', hero: '张飞', lane: '游走', k: 0, d: 4, a: 3, score: 4.9, gold: 4834, mvp: null, win: false, medal: '' },
        { player: 'p08', hero: '扁鹊', lane: '中路', k: 2, d: 1, a: 9, score: 7.7, gold: 6604, mvp: null, win: true, medal: '' },
        { player: 'p02', hero: '孙策', lane: '对抗路', k: 3, d: 2, a: 14, score: 8.8, gold: 7293, mvp: null, win: true, medal: '' },
        { player: 'p17', hero: '蒙犽', lane: '发育路', k: 5, d: 1, a: 6, score: 11.0, gold: 8867, mvp: null, win: true, medal: '铜牌发育路' },
        { player: 'p05', hero: '马超', lane: '打野', k: 7, d: 0, a: 7, score: 11.4, gold: 9232, mvp: 'win', win: true, medal: '银牌打野' },
        { player: 'p03', hero: '鬼谷子', lane: '游走', k: 4, d: 1, a: 11, score: 9.2, gold: 6195, mvp: null, win: true, medal: '' }
      ]
    },
    {
      id: 'm20261016-5', date: '2026-10-16', time: '21:58', seq: 5, score: '20 : 20', winnerTeam: 'A',
      teams: { A: ['p05', 'p08', 'p02', 'p06', 'p07'], B: ['p01', 'p18', 'p17', 'p19', 'p10'] },
      records: [
        { player: 'p05', hero: '弈星', lane: '中路', k: 6, d: 0, a: 12, score: 11.9, gold: 13823, mvp: 'win', win: true, medal: '金牌中路' },
        { player: 'p08', hero: '杨戬', lane: '对抗路', k: 1, d: 5, a: 11, score: 6.0, gold: 9565, mvp: null, win: true, medal: '' },
        { player: 'p02', hero: '马可波罗', lane: '发育路', k: 4, d: 3, a: 8, score: 8.1, gold: 13013, mvp: null, win: true, medal: '' },
        { player: 'p06', hero: '铠', lane: '打野', k: 7, d: 5, a: 9, score: 7.7, gold: 11558, mvp: null, win: true, medal: '' },
        { player: 'p07', hero: '少司缘', lane: '游走', k: 2, d: 7, a: 11, score: 5.6, gold: 8808, mvp: null, win: true, medal: '' },
        { player: 'p01', hero: '高渐离', lane: '中路', k: 4, d: 5, a: 7, score: 6.7, gold: 10516, mvp: null, win: false, medal: '' },
        { player: 'p18', hero: '影', lane: '对抗路', k: 2, d: 5, a: 11, score: 6.6, gold: 11009, mvp: null, win: false, medal: '' },
        { player: 'p17', hero: '艾琳', lane: '发育路', k: 5, d: 4, a: 7, score: 7.2, gold: 11854, mvp: null, win: false, medal: '' },
        { player: 'p19', hero: '心魔六耳', lane: '打野', k: 6, d: 3, a: 6, score: 10.2, gold: 13098, mvp: 'lose', win: false, medal: '铜牌打野' },
        { player: 'p10', hero: '百里守约', lane: '发育路', k: 3, d: 3, a: 2, score: 6.2, gold: 9857, mvp: null, win: false, medal: '' }
      ]
    },
    {
      id: 'm20261016-6', date: '2026-10-16', time: '22:24', seq: 6, score: '26 : 22', winnerTeam: 'B',
      teams: { A: ['p06', 'p18', 'p02', 'p19', 'p17'], B: ['p01', 'p10', 'p05', 'p07', 'p08'] },
      records: [
        { player: 'p06', hero: '兰陵王', lane: '打野', k: 5, d: 4, a: 5, score: 6.2, gold: 13269, mvp: null, win: false, medal: '' },
        { player: 'p18', hero: '哪吒', lane: '对抗路', k: 4, d: 6, a: 9, score: 5.3, gold: 10200, mvp: null, win: false, medal: '' },
        { player: 'p02', hero: '干将莫邪', lane: '中路', k: 7, d: 2, a: 7, score: 10.4, gold: 14669, mvp: 'lose', win: false, medal: '铜牌中路' },
        { player: 'p19', hero: '戈娅', lane: '发育路', k: 8, d: 5, a: 10, score: 10.1, gold: 13445, mvp: null, win: false, medal: '' },
        { player: 'p17', hero: '刘禅', lane: '游走', k: 2, d: 5, a: 8, score: 7.7, gold: 9726, mvp: null, win: false, medal: '' },
        { player: 'p01', hero: '镜', lane: '打野', k: 5, d: 5, a: 4, score: 7.9, gold: 14165, mvp: null, win: true, medal: '' },
        { player: 'p10', hero: '芈月', lane: '对抗路', k: 4, d: 6, a: 3, score: 6.6, gold: 12728, mvp: null, win: true, medal: '' },
        { player: 'p05', hero: '沈梦溪', lane: '中路', k: 9, d: 2, a: 4, score: 12.3, gold: 14376, mvp: 'win', win: true, medal: '银牌中路' },
        { player: 'p07', hero: '孙尚香', lane: '发育路', k: 0, d: 8, a: 9, score: 4.2, gold: 9899, mvp: null, win: true, medal: '' },
        { player: 'p08', hero: '墨子', lane: '游走', k: 4, d: 5, a: 7, score: 6.8, gold: 9937, mvp: null, win: true, medal: '' }
      ]
    },
    {
      id: 'm20261016-7', date: '2026-10-16', time: '22:52', seq: 7, score: '5 : 14', winnerTeam: 'A',
      teams: { A: ['p18', 'p08', 'p02', 'p19', 'p07'], B: ['p01', 'p05', 'p10', 'p06', 'p17'] },
      records: [
        { player: 'p18', hero: '狂铁', lane: '对抗路', k: 3, d: 4, a: 0, score: 6.7, gold: 4569, mvp: 'win', win: true, medal: '' },
        { player: 'p08', hero: '米莱狄', lane: '中路', k: 1, d: 2, a: 3, score: 6.0, gold: 4614, mvp: null, win: true, medal: '' },
        { player: 'p02', hero: '敖隐', lane: '发育路', k: 0, d: 4, a: 4, score: 4.0, gold: 4346, mvp: null, win: true, medal: '' },
        { player: 'p19', hero: '心魔六耳', lane: '打野', k: 1, d: 3, a: 2, score: 5.0, gold: 4856, mvp: null, win: true, medal: '' },
        { player: 'p07', hero: '鲁班大师', lane: '游走', k: 0, d: 1, a: 4, score: 4.5, gold: 3685, mvp: null, win: true, medal: '' },
        { player: 'p01', hero: '吕布', lane: '对抗路', k: 3, d: 1, a: 4, score: 8.4, gold: 6024, mvp: null, win: false, medal: '' },
        { player: 'p05', hero: '海诺', lane: '中路', k: 1, d: 1, a: 7, score: 9.8, gold: 7079, mvp: 'lose', win: false, medal: '' },
        { player: 'p10', hero: '百里守约', lane: '发育路', k: 5, d: 1, a: 2, score: 9.4, gold: 6518, mvp: null, win: false, medal: '' },
        { player: 'p06', hero: '铠', lane: '打野', k: 1, d: 1, a: 1, score: 4.8, gold: 5273, mvp: null, win: false, medal: '' },
        { player: 'p17', hero: '刘禅', lane: '游走', k: 4, d: 1, a: 3, score: 8.3, gold: 4934, mvp: null, win: false, medal: '' }
      ]
    }
  ]
};
