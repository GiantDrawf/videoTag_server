const { db } = require('../dbconfig/mongoose');
const videoTagDb = db.useDb('videos');

// 连接videoTag表
const videoTagSchema = require('../models/videoTagSchema');
const mongoosePaginate = require('./paginate');
videoTagSchema.plugin(mongoosePaginate);
const videoTag = videoTagDb.model('videoTag', videoTagSchema);


const returnParam = `
    creator
    guid
    tags
    videoPlayUrl
`;

/**
 * 根据搜索条件返回视频的所有信息
 * @param {*} params
 */
exports.queryVideoInfo = async params => {
    const page = Number(params.pagination.current);
    const limit = Number(params.pagination.pageSize);
    let sort = {};
    if (params.sort && params.sort.key) {
        sort = {
            [params.sort.key]: params.sort.order == 'ascend' ? 1 : -1,
        };
    }
    let videoParams = {
        select:returnParam,
        page,
        limit,
        sort,
    };
    const searchParams = [
        'guid',
        'tags',
        'videoPlayUrl',
    ];
    const searchRules = { creator : "抖音" };
    let starttime = '';
    let endtime = '';
    searchParams
        .map(param => {
            if (params.querys[param]) {
                return {
                    key: param,
                    value: params.querys[param],
                };
            } else {
                return null;
            }
        })
        .forEach(data => {
            if (data) {
                if(searchRules[data.key] = "tags"){
                    searchRules[data.key] = new RegExp(data.value);
                }else{
                    searchRules[data.key] = data.value;
                }
            }
        });
    const videoInfo = await videoTag.paginate(searchRules, videoParams);
    return videoInfo;
}

exports.queryAllTags = async () => {
   const allTags = await videoTag.find({"creator":"抖音"}).distinct('tags');
   return allTags;
}
