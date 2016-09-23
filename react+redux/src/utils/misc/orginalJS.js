import * as consts from 'constants/const'
function selectPhoto(callback){
  if(typeof Bridge === 'undefined'){ return }
  let photoSelector = Bridge.require('PhotoSelector')
  photoSelector.select({},
    {
      success: callback,
      fail: callback
    })
}

function cutPhoto(callback){
  if(typeof Bridge === 'undefined'){ return }
  let photoSelector = Bridge.require('PhotoSelector')
  photoSelector.cut({ zoom: { 'x': 512 }, previewZoom: { 'x': 512 } },
    {
      success: callback,
      fail: function(result){
        window.toast.setTxt('取消上传图片')
      }
    })
}

function UploadPhoto(photo, session, projectInfo, callback){
  if(typeof Bridge === 'undefined'){ return }
  let cs = Bridge.require('cs')
  cs.upLoadFileByUUID(
    {
      'uuid': photo,
      'detailParam': {
        'dentry': {
          'name': `project-icon.jpg`,
          'scope': 1,
          'path': session.path
        },
        'extendUploadData': {
          'infoJson': JSON.stringify(projectInfo),
          'metaJson': { 'height': 512, 'width': 512 },
          'otherName': `${projectInfo.project_info.name}.jpg`
        },
        'session': session.session,
        'maxUploadLength': 10240,
        'maxConnectTime': 2,
        'maxReadTime': 0
      }}, {
        success: callback,
        fail: function(result){
          window.toast.setTxt('上传失败')
        }
      }
  )
}

module.exports = {
  UploadPhoto: UploadPhoto,
  cutPhoto: cutPhoto,
  selectPhoto: selectPhoto
}
