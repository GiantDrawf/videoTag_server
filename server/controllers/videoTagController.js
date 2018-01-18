const lineReader = require('line-reader');
const videoTagModel = require('../models/videoTagModel');
const exportConfig = require('../../config/exportConfig');

const parseJson = jsonString => {
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        throw new Error('10001');
    }
};

/**
 * 返回视频所有信息接口
 * @param {*} ctx
 * @param {*} next
 */
exports.queryVideoInfo = async (ctx, next) => {
    let bodystring = ctx.request.query.body;
    let body = parseJson(bodystring);
    let returnVideoInfo = await videoTagModel.queryVideoInfo(body);
    let videoTag = {
        docs: returnVideoInfo.docs,
        pagination: {
            total: returnVideoInfo.total,
            pageSize: returnVideoInfo.limit,
            current: returnVideoInfo.page
        }
    }
    if (returnVideoInfo.docs) {
        exportConfig(ctx, 'success', videoTag);
    }
    return next;
};


/**
 * 返回所有标签接口
 * @param {*} ctx
 * @param {*} next
 */
exports.queryAllTags = async (ctx, next) => {
    let allTags = await videoTagModel.queryAllTags();
    if (allTags) {
        exportConfig(ctx, 'success', allTags);
    }
    return next;
};

