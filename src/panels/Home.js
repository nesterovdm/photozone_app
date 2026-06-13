import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';

import { Snackbar, Title, Counter, PopoutWrapper, usePlatform, Platform, Progress, View, Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, Spinner, ScreenSpinner, ModalCard, File, Placeholder, FormItem, Input, ButtonGroup, FormStatus, CardGrid, Card, Root, RadioGroup, Radio, HorizontalScroll, HorizontalCell, FixedLayout, Separator, Tabs, TabsItem } from '@vkontakte/vkui';

import { Icon24VideoCircleOutline, Icon24ErrorCircleOutline, Icon12Cancel, Icon28WarningTriangleOutline, Icon56MessagesOutline, Icon201CircleFillGold, Icon24Cancel, Icon56ErrorOutline, Icon28HourglassOutline, Icon56UserAddOutline, Icon56NewsfeedOutline, Icon56StoryOutline, Icon20CheckCircleFillGreen } from '@vkontakte/icons';

import imgPortrait from '../img/portrait.png';
import imgPartner from '../img/partner.png';
import imgLimit from '../img/smile.png';
import imgModal from '../img/modal.jpg';
import imgOb from '../img/ob.jpg';
import imgPodarok from '../img/podarok.png';
import imgApp from '../img/app.jpg';
import gifLoad from '../img/load.gif';
import imgWarn from '../img/warn.jpg';
import imgGroups from '../img/groups.jpg';
import imgGroups1 from '../img/groups1.png';
import imgGroups2 from '../img/groups2.png';
import imgAccess from '../img/access.jpg';
import imgAccess2 from '../img/access2.png';
import axios from 'axios';
import $ from 'jquery';

let timeAd = 30;
setInterval(function () {
	timeAd += 1;
}, 1000);

const Home = ({ setPopout, setModalError, setModal, setModalsList, setAnimate }) => {
	const platform = usePlatform();

	const [activeView, setActiveView] = useState(null);
	const [activePanel, setActivePanel] = useState('spinner');
	const [fetchedUser, setUser] = useState(null);
	const [resultUrl, setResultUrl] = useState("");
	const [resultImageUrlPost, setResultImageUrlPost] = useState("");
	const [snackbar, setSnackbar] = useState(null);
	const [openGroupPage, setOpenGroupPage] = useState(1);
	const [openAccessPage, setOpenAccessPage] = useState(1);

	const [urlPublication, setUrlPublication] = useState("");
	const [textPublication, setTextPublication] = useState("");
	const [textAlbum, setTextAlbum] = useState("");

	const [publicationPost, setPublicationPost] = useState(null);
	const [publicationStory, setPublicationStory] = useState(null);
	const [stickerStory, setStickerStory] = useState("");
	const [appId, setAppId] = useState(null);
	const [accessToken, setAccessToken] = useState(null);
	const [r, setR] = useState(true);
	const [a, setA] = useState(0);
	const [texts, setTexts] = useState([['text', 'text'], ['text', 'text'], ['text', 'text']]);
	const [groupList, setGroupList] = useState([]);
	const [jsonResult, setJsonResult] = useState("");
	const [waitTime, setWaitTime] = useState(0);
	const [ad, setAd] = useState(0);
	const [bannerAd, setBannerAd] = useState(0);
	const [photosList, setPhotosList] = useState([]);
	const [avatarUrl, setAvatarUrl] = useState(null);
	const [disabledButtonChange, setDisabledButtonChange] = useState(true);
	const [errorResult, setErrorResult] = useState(false);

	const [countResults, setCountResults] = useState(0);

	const [textId, setTextId] = useState(0);
	const [images, setImages] = useState(null);
	const [imagePath, setImagePath] = useState(null);
	const [val, setVal] = useState(0);
	const [story, setStory] = useState(0);
	const [text, setText] = useState("");

	const [changeImgOpen, setChangeImgOpen] = useState(0);
	const [heightViewRows, setHeightViewRows] = useState([1100,2300,2300]);
	const [countClicksViewBlocks, setCountClicksViewBlocks] = useState(0);
	const [offsetFeed, setOffsetFeed] = useState(0);

	const [imgHash, setImgHash] = useState("");

	const [activeTabCategory, setActiveTabCategory] = useState(1);
	const [categoriesList, setCategoriesList] = useState([]);

	const [viewBanner, setViewBanner] = useState(1);
	const [maxScroll, setMaxScroll] = useState(-1);
	//const [listIdsImages, setListIdsImages] = useState([]);
	const [listSaveSentImages, setListSaveSentImages] = useState([]);

	const [numCounter, setNumCounter] = useState(5);
	const [v, setV] = useState(0);

	const intervalScroll = useRef(0);

	const [groupMessages, setGroupMessages] = useState(0);

	const [fileDataPartner, setFileDataPartner] = useState("");
	const [openTest, setOpenTest] = useState(0);

	const [changeImgUrl, setChangeImgUrl] = useState("");
	const [joinGroup, setJoinGroup] = useState(0);
	const [groupsBonus, setGroupsBonus] = useState([]);
	const [gender, setGender] = useState(0);

	let search = window.location.search;
	let getParams = search.split("?")[1];

	let site = "https://photozone-new-app.vktests-app.ru/";

	let access_token = accessToken;
	let viewResult = jsonResult;
	let text_album = textAlbum;
	let text_publication = textPublication;

	let dataImgPartner = fileDataPartner;

	let imageHash = "";

	function openVKAd () {
    	if(timeAd >= 30) {
	    	bridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' })
	    	.then((data) => {
	    		timeAd = 0;
	    	})

	    	.catch((error) => {
	    		timeAd = 0;
	    	});
	    }
    }

	function getUserInfo (userInfo, confirm = 0) {
	  	bridge.send('VKWebAppGetUserInfo')
  		.then(data_user => {
  			setImages(userInfo['data']['response']['images']);
  			getLooksFeed(1, 1, data_user.sex, userInfo['data']['response']['images'], data_user, imageHash);
  			setCountResults(userInfo['data']['response']['count_results']);
  			setCategoriesList(userInfo['data']['response']['categoriesList']);
  			/*let listIds = [];
  			{userInfo['data']['response']['images'][0].map((imagesBlock) => {
				{imagesBlock.map((imageInfo) => {
  					listIds.push(imageInfo['path'].split("/")[1]);
  				})}
			})};
			setListIdsImages(listIds);*/
			setNumCounter(userInfo['data']['response']['counter']);
			setV(userInfo['data']['response']['v']);
			setGroupMessages(userInfo['data']['response']['group_messages']);
			setGender(userInfo['data']['response']['gender']);

  			setUser(data_user);
		  	setR(userInfo['data']['response']['r']);
		  	setTexts(userInfo['data']['response']['texts']);
		  	setGroupList(userInfo['data']['response']['group']);
		  	setGroupsBonus(userInfo['data']['response']['groupsBonus']);
		  	setAppId(userInfo['data']['response']['app_id']);
		  	setUrlPublication(userInfo['data']['response']["url_publication"]);
            setA(userInfo['data']['response']["a"]);

		  	if(userInfo['data']['response']['open'] == 0) {
				setOpenGroupPage(0);
		  		setOpenAccessPage(0);
		  	}

		  	setAd(userInfo['data']['response']["ad"]);
		  	setBannerAd(userInfo['data']['response']["bannerAd"]);
		  	if(userInfo['data']['response']['result']) {
		  		/*if(userInfo['data']['response']['count_results'] < 2) {
		  			setActivePanel('limit');
		  		} else {*/
			  		setChangeImgOpen(0);
			  		setJsonResult(userInfo['data']['response']['resultInfo']);
			  		viewResult = userInfo['data']['response']['resultInfo'];
			  		if(userInfo['data']['response']['openPageLimit'] && userInfo['data']['response']['count_results'] < 10) {
			  			setActivePanel('limit');
			  		} else {
			  			openResult();
			  		}
			  	//}
		  	} else {
		  		setActivePanel('images');
		  		let urlObj = new URL(window.location.href);
				imageHash = urlObj.hash;
		  		if(imageHash.split('-')[0] != '#look') {
		  			// startTrackingScroll(userInfo['data']['response']['images'], data_user);
		  		}
		  	}
		  	setActiveView('panelsApp');
		  	setAnimate(true);
		  	setPopout(null);

		  	bridge.send('VKWebAppShowBannerAd', {
			  	banner_location: 'bottom'
			});
	  	})

	  	.catch(error_user => {
			setActivePanel('error_app');
			setActiveView('panelsApp');
			setPopout(null);
		});
	}

	useEffect(() => {
		let urlObj = new URL(window.location.href);
		imageHash = urlObj.hash;

		if(imageHash.split('-')[0] == '#look' || imageHash.replace('#', '') != "" && Number.isInteger(Number(imageHash.replace('#', '')))) {
			imageHash = imageHash.replace('&', '');
			setImgHash(Number(imageHash.replace('#', '')));
			imageHash = imageHash.replace('#', '');
		} else {
			imageHash = "";
		}

		bridge.send('VKWebAppGetUserInfo')
  		.then(data_user => {
  			if(data_user.sex == 1) {
				if(imageHash.split('-')[0] == 'look') {
					setActiveTabCategory(3);
				}
			}
		});

		axios.get(site + "user?type=check&width="+window.innerWidth+"&hash="+imageHash+"&" + getParams)
			.then(function (userCheck) {
				if(userCheck['data']['response']['userNew'] == 1) {
					setActivePanel('start');
					setActiveView('panelsApp');
					setAnimate(true);
					setPopout(null);
				} else {
					getUserInfo(userCheck);
					console.log('user ok');
				}
			})

			.catch(function (errorCheck) {
				setActivePanel('error_app');
				setActiveView('panelsApp');
				setPopout(null);
			});
	}, []);

	function imageDownload (e) {
		setPopout(<ScreenSpinner size='large' />);
    	let url = window.URL || window.webkitURL;
		let form_data = new FormData();
        // typeDownload = "upload";
        let file_data = e.target.files[0]; 
        if(file_data.type == "image/jpeg" || file_data.type == "image/png") {
	        if(file_data.size > 10 * 1024 * 1024) {
	            openModalError(
	            	"Не удалось загрузить изображение",
	            	"Пожалуйста, загрузите фото размером менее 10 Мб"
	            );
	            form_data = new FormData(); 
	            $("#image").val("");
	            setPopout(null);
	        } else {
		        let img = new Image();
		        img.onload = function () {
		            if(this.width > 3000 || this.height > 3000) {
		                openModalError(
			            	"Не удалось загрузить изображение",
			            	"Пожалуйста, загрузите фото меньшего разрешения"
			            );
		                form_data = new FormData();
		                $("#image").val("");
		                setPopout(null);
		            } else {
		                form_data.append("image[]", file_data);
		                viewResult = "";
						startLoad(1);
		                getResult('upload', textId, imagePath, form_data);
		            }
		        };
		        
		        img.src = url.createObjectURL(file_data);
	        }
        } else {
            openModalError(
            	"Не удалось загрузить изображение",
            	"Пожалуйста, загрузите PNG или JPG картинку"
            );
            form_data = new FormData(); 
            $("#image").val("");
            setPopout(null);
        }
    }

	function openModalError (header, text) {
		setModalError(
    		<ModalCard
		        id="modalError"
		        onClose={() => setModal(null)}
		        icon={<Icon56ErrorOutline />}
		        header={header}
		        subheader={text}
		        actions={
		          	<ButtonGroup size="l" mode="vertical" stretched>
			            <File
				            stretched="true"
				            size="l"
				            align="center"
				            id="image"
				            onChange={ (e) => { setModal(null); imageDownload(e); } }
			            >
			            	Загрузить другое фото
			            </File>
	          		</ButtonGroup>
		        }
	      	/>
    	);

      	setModal('modalError');
	}

	function openModal(name, name_2 = null) {

		let modalsList_view = [];
		let activeModal_view = null;

		if(name == 'group') {
			modalsList_view.push(
				<ModalCard
			        id="group"
			        onClose={() => setModal(name_2)}
			        icon={<Icon56UserAddOutline />}
			        header="Понравилось наше приложение?"
			        subheader="Подписка самая лучшая благодарность для нас! Желаете подписаться?"
			        actions={
			          	<ButtonGroup size="l" mode="vertical">
				            <Button
				              key="deny"
				              size="l"
				              mode="secondary"
				              stretched
				              onClick={() => setModal(name_2)}
				            >
				               Отказаться
				            </Button>
				            <Button
				              key="allow"
				              size="l"
				              mode="primary"
				              stretched
				              onClick={() => groupModal()}
				            >
				              Да, хорошо
				            </Button>
				        </ButtonGroup>
			        }
		      	/>
			);

			name = name_2;

			activeModal_view = 'group';
		}

		if(name == 'post') {
			modalsList_view.push(
				<ModalCard
			        id="post"
			        onClose={() => setModal(null)}
			        icon={<Icon56NewsfeedOutline />}
			        header="Поделитесь с друзьями, чтобы они могли узнать о себе!"
			        subheader="Для этого необходимо дать доступ."
			        actions={
			          	<ButtonGroup size="s" stretched>
				            <Button
				              key="deny"
				              size="l"
				              mode="secondary"
				              stretched
				              onClick={() => setModal(null)}
				            >
				               Отказаться
				            </Button>
				            <Button
				              key="allow"
				              size="l"
				              mode="primary"
				              stretched
				              onClick={() => { openVKPost(); setModal(null); }}
				            >
				              Разрешить
				            </Button>
				        </ButtonGroup>
			        }
		      	/>
			);

			if(name_2 == null) {
				activeModal_view = 'post';
			}
		}

		if(name == 'story') {
			modalsList_view.push(
				<ModalCard
			        id="story"
			        onClose={() => setModal(null)}
			        icon={<Icon56StoryOutline />}
			        header="Опубликуйте историю"
			        subheader="Опубликуйте историю с результатами"
			        actions={
			          	<ButtonGroup size="s" stretched>
				            <Button
				              key="deny"
				              size="l"
				              mode="secondary"
				              stretched
				              onClick={() => setModal(null)}
				            >
				              Закрыть
				            </Button>
				            <Button
				              key="allow"
				              size="l"
				              mode="primary"
				              stretched
				              onClick={() => { openVKStory(); setModal(null); }}
				            >
				              Опубликовать
				            </Button>
				        </ButtonGroup>
			        }
		      	/> 
			);
			
			if(name_2 == null) {
				activeModal_view = 'story';
			}
		}

		if(name == 'error') {
			modalsList_view.push(
				<ModalCard
			        id="error"
			        onClose={() => bridge.send("VKWebAppClose", {"status": "success"})}
			        icon={<Icon56ErrorOutline />}
			        header="Не удалось загрузить результат"
			        subheader="Пожалуйста, попробуйте позже"
		      	/> 
			);
			activeModal_view = 'error';
		}

		if(name == 'error_access_photos') {
			modalsList_view.push(
				<ModalCard
			        id="error_access_photos"
			        onClose={() => setModal(null)}
			        icon={<Icon56ErrorOutline />}
			        actions={
			          	<ButtonGroup size="s" stretched>
				            <Button
				              key="allow"
				              size="l"
				              mode="primary"
				              stretched
				              onClick={() => { viewPhotosProfile(); setModal(null); }}
				            >
				               Разрешить доступ
				            </Button>

				            <File
					            stretched="true"
					            size="l"
					            align="center"
					            id="image"
					            onChange={ (e) => { setModal(null); imageDownload(e); } }
				            >
				            	Загрузить фото
				            </File>
					        </ButtonGroup>
			        }
			        header="Ошибка"
			        subheader="Для получения фото с профиля нужно разрешить доступ"
		      	/> 
			);
			activeModal_view = 'error_access_photos';
		}

		if(name == 'error_photos') {
			modalsList_view.push(
				<ModalCard
			        id="error_photos"
			        onClose={() => setModal(null)}
			        icon={<Icon56ErrorOutline />}
			        actions={
			          	<ButtonGroup size="s" stretched>
				            <File
					            stretched="true"
					            size="l"
					            align="center"
					            id="image"
					            onChange={ (e) => { setModal(null); imageDownload(e); } }
				            >
				            	Загрузить фото
				            </File>
					        </ButtonGroup>
			        }
			        header="Ошибка"
			        subheader="Не удалось загрузить фото из профиля. Пожалуйста, загрузите фото с устройства"
		      	/> 
			);
			activeModal_view = 'error_photos';
		}

		setModalsList(modalsList_view);
		setModal(activeModal_view);
	}

	function getResult ( typeDownload, changeTextId, imgPath, imageData = new FormData() ) {
		//setPopout(<ScreenSpinner size='large' />);
		imageData.append('changeImg', imgPath);
		imageData.append('changeTextId', changeTextId);
		if(dataImgPartner != "") {
			imageData.append('image[]', dataImgPartner);
			if(typeDownload == 'ava') {
				typeDownload = 'upload_partner';
			}
		}

		axios({
			method: "post",
			url: site + "image?hash="+imgHash+"&type="+typeDownload+"&" + getParams,
			data: imageData
		})

		.then(function (response) {
			setJsonResult(response['data']);
			viewResult = response['data'];
			setPublicationStory(response['data']['result_blob']);
			VKImgStory = response['data']['result_blob'];
			setStickerStory(response['data']['sticker_story']);
			setPopout(null);
			/*if(response['data']['server']) {
				let server = response['data']['server'];
				setTimeout(function () {
				    let checkResult = setInterval(function () {
				    	axios.get(site + "checkDoneResults?server="+server+"&" + getParams)
				    	.then(function (dataCheckResult) {
				    		if(dataCheckResult["data"]["status"] == 1) {
				    			clearInterval(checkResult);
				    			axios.get(site + "image?type=getResult&country="+country+"&server="+server+"&" + getParams)
				    			.then(function (dataResult) {
				    				setJsonResult(dataResult["data"]);
				    				viewResult = dataResult["data"];
				    			});
				    		} else {
				    			if(dataCheckResult["data"]["status"] == "deleted") {
				    				setJsonResult(dataCheckResult["data"]["response"]);
				    				viewResult = dataCheckResult["data"]["response"];
				    				clearInterval(checkResult);
				    			}
				    		}
				    	});
				    }, 3000);
			    }, 10000);

			} else {
				setJsonResult(response['data']);
				viewResult = response['data'];
			}*/
		})
		  
		.catch(function (error) {
		    setJsonResult({ error: "error load" });
		    viewResult = { error: "error load" };
		    setPopout(null);
		});
	};

	let imgPost = resultImageUrlPost;
	let imgResult = resultUrl;
	let VKImgPost = publicationPost;
	let VKImgStory = publicationStory;

	function openResult (startPublication = 0, open = 1) {
		if(viewResult == "") {
			if(waitTime >= 10) {
				setWaitTime(0);
				setSnackbar(
					<Snackbar
				        onClose={() => setSnackbar(null)}
				        duration={7000}
				        before={
				            <Icon28HourglassOutline style={{ color: 'var(--vkui--color_background_accent)', marginLeft: "5px" }}/> 
				        }
				    >
				        Совсем скоро результат будет готов! Пожалуйста, не покидайте приложение
				    </Snackbar>
				);
			}

			setWaitTime(waitTime + 0.5);
			setTimeout(function () {
				openResult(startPublication);
			}, 500);
		} else {
			setPopout(null);
			setSnackbar(null);

			if(viewResult['error']) {
				setErrorResult(true);
				if(viewResult['msg'] == 'Face not found partner') {
					setActivePanel('image_partner_error');
				} else {
					setActivePanel('error');
				}
			} else {
				setResultImageUrlPost(viewResult["post"]);
				imgPost = viewResult["post"];
                setResultUrl(site + viewResult["image_url"]);
                imgResult = site + viewResult["image_url"];
                setCountResults(viewResult['count_results']);

                setTextAlbum(viewResult['text_album']);
			  	text_album = viewResult['text_album'];
			  	setTextPublication(viewResult['text_publication']);
			  	text_publication = viewResult['text_publication'];

			  	setText(<div>ЭТО НЕВЕРОЯТНО! Ваш образ оценили {viewResult['likes_string']} нашего приложения, вы собрали рекордные {viewResult['points_string']}!<br/><br/>Обязательно опубликуйте результат, такой образ не оставит никого равнодушным!</div>);

			  	if(viewResult['count_results'] >= 10 || openGroupPage == 1) {
			  		// setChangeImgOpen(0);
			  	}

			  	if(openAccessPage == 0) {
			  		/* setViewBanner(0);
			  		setPopout(
			  		<PopoutWrapper onClick={() => { setPopout(null); setViewBanner(1); }}>
				      	<div style={{ width: "95%", position: "relative" }}>
					     	<div style={{ width: "24px", display: "block", marginLeft: "auto"}}  onClick={() => { setPopout(null); setViewBanner(1); }}> <Icon24Cancel style={{ position: "absolute", color: "white" }} /></div>
					       	<a href="https://vk.com/app51748467#utm_campaign=promo&utm_source=fotoz" target="_blank" onClick={() => { setPopout(null); axios.get(site + "event?type=ob&" + getParams); setViewBanner(1); }}><img src={imgModal} style={{ width: "100%" }} /></a>
					      </div>
				    </PopoutWrapper>
				    ); */
			  	}

                if(startPublication == 1 || accessToken != null) {
					/*setPopout(<ScreenSpinner size='large' />);
					setTimeout(function () {
						publicationResult('post', 1);
					}, 500);*/
					if(open == 0) {
						publicationResult('nopost', 0);
					} else {
						setActivePanel('result');
					}
				} else {
					setActivePanel('result');
					if(openGroupPage == 1) {
						// openModal('group', 'post');
					} else {
						if(openAccessPage == 1) {
							// openModal('post');
						}
					}
				}
			}
		}
	}

	/*function publicationWall (token) {
		bridge.send("VKWebAppCallAPIMethod", {"method": "photos.getWallUploadServer", "params": {"v":"5.131", "access_token":token }})
			.then(data_upload => {
				let upload_url = data_upload["response"]["upload_url"];
				let uploadData = new FormData();
				uploadData.append("url", imgPost);
				uploadData.append("upload_url", upload_url);
				axios({
					method: "post",
					url: site + "image?" + getParams,
					data: uploadData
				})
					.then(function (data_post) {
					  	bridge.send("VKWebAppCallAPIMethod", {"method": "photos.saveWallPhoto", "params": {"user_id": fetchedUser.id, "server": data_post["data"]["server"], "photo": data_post["data"]["photo"], "hash": data_post["data"]["hash"], "v":"5.131", "caption": text_publication, "access_token":token}})
							.then(data_save => {
								bridge.send("VKWebAppShowWallPostBox", {"message": text_publication, "attachments": "photo"+fetchedUser.id+"_"+data_save["response"][0]["id"]+",https://vk.com/app"+appId, "primary_attachments_mode": "carousel"});
							})

							.catch(function (error_save) {
							    setPopout(null);
							    console.log(error_save);
							});
					})
					  
					.catch(function (error) {
					    setPopout(null);
					});
			})

			.catch(error_upload => {
				setPopout(null);
				console.log(error_upload);
			});
	}*/

	function publicationResult (type = 'post', openPageResult = 0) {
		let token = access_token;
		setPopout(<ScreenSpinner size='large' />);
  			
	        bridge.send("VKWebAppCallAPIMethod", {"method": "photos.getAlbums", "params": {"owner_id": fetchedUser.id, "v":"5.131", "access_token":token}})
		    .then(data_albums => {
		    	let album_id = 0;
		        for (const [key, value] of Object.entries(data_albums["response"]["items"])) {
		        	if(value["title"] == "Фотозона") {
		            	album_id = value["id"];
		    		}
		    	}
					        
		        if(album_id == 0 && a == 1) {
		            bridge.send("VKWebAppCallAPIMethod", {"method": "photos.createAlbum", "params": {"title": "Фотозона", "description": text_album, "v":"5.131", "access_token":token}})
		            .then(data_album => {
		                album_id = data_album["response"]["id"];
		            })

		            .catch(error_album => {
		                setPopout(null);
		                return;
		            });
		        }

		        setTimeout(function () {
		        	let paramsUpload = {};
		        	if(a == 1) {
		        		paramsUpload = {"method": "photos.getUploadServer", "params": { "album_id": album_id, "v":"5.131", "access_token":token }};
		        	} else {
		        		paramsUpload = {"method": "photos.getWallUploadServer", "params": {"v":"5.131", "access_token":token }};
		        	}
		        	bridge.send("VKWebAppCallAPIMethod", paramsUpload)
						.then(data_upload => {
							let upload_url = data_upload["response"]["upload_url"];
							let uploadData = new FormData();
							uploadData.append("url", imgPost);
							uploadData.append("upload_url", upload_url);
							axios({
								method: "post",
								url: site + "image?" + getParams,
								data: uploadData
							})
								.then(function (data_post) {
									let paramsSave = {};
									if(a == 1) {
										paramsSave = {"method": "photos.save", "params": { "album_id": album_id, "hash": data_post["data"]["hash"], "server": data_post["data"]["server"], "photos_list": data_post["data"]["photos_list"], "aid": data_post["data"]["aid"], "v":"5.131", "description": text_album, "access_token":token }};
									} else {
										paramsSave = {"method": "photos.saveWallPhoto", "params": {"user_id": fetchedUser.id, "server": data_post["data"]["server"], "photo": data_post["data"]["photo"], "hash": data_post["data"]["hash"], "v":"5.131", "caption": text_publication, "access_token":token}};
									}
								  	bridge.send("VKWebAppCallAPIMethod", paramsSave)
										.then(data_save => {
											if(data_save["response"][1]) {
												setPublicationPost("photo"+fetchedUser.id+"_"+data_save["response"][0]["id"]+",photo"+fetchedUser.id+"_"+data_save["response"][1]["id"]);
												VKImgPost = "photo"+fetchedUser.id+"_"+data_save["response"][0]["id"]+",photo"+fetchedUser.id+"_"+data_save["response"][1]["id"];
											} else {
												setPublicationPost("photo"+fetchedUser.id+"_"+data_save["response"][0]["id"]);
												VKImgPost = "photo"+fetchedUser.id+"_"+data_save["response"][0]["id"];
											}
											/*setPublicationStory(data_save["response"][0]["sizes"][2]["url"]);
											VKImgStory = data_save["response"][0]["sizes"][2]["url"];*/

		    								if(type == 'post') {
		    									setPopout(null);
												openVKPost();
												//publicationWall(token);
		    									if(openPageResult == 1) {
		    										setActivePanel('result');
		    									}
		    								}
										})

										.catch(function (error_save) {
										    setPopout(null);
										    console.log(error_save);
										});
								})
								  
								.catch(function (error) {
								    setPopout(null);
								});
						})

						.catch(error_upload => {
							setPopout(null);
							console.log(error_upload);
						});
		        }, 1000);

	        })

	        .catch(error_albums => {
				setPopout(null);
			});
	}

	function actionPost () {
		setPopout(null);
		if(openGroupPage == 1) {
			if(VKImgStory) {
				//openModal('group', 'story');
			} else {
				//openModal('group');
			}
		} else {
			if(VKImgStory) {
				//openModal('story');
			}
		}
	}

	function openVKPost () {
		return;
		/*if(VKImgPost) {
			setPopout(<ScreenSpinner size='large' />);
			bridge.send("VKWebAppShowWallPostBox", {"message": text_publication, "attachments": VKImgPost+",https://vk.com/app51789496", "primary_attachments_mode": "carousel"})
			.then(data_post => {
				//if(activePanel != 'access') {
					openVKAd();
				//}
				/.then(dataAds => {
					actionPost();
				})

				.catch(errorAds => {
					actionPost();
				});/
				actionPost();
				axios.get(site + "event?type=post&" + getParams);
			})

			.catch(error_post => {
				//if(activePanel != 'access') {
					openVKAd();
				//}
				/.then(dataAds => {
					actionPost();
				})

				.catch(errorAds => {
					actionPost();
				});/
				/if(activePanel == 'access') {
					startLoad(3);
					setPopout(null);
				} else {
					actionPost();
				}/
				actionPost();
			});
		} else {
			if(!access_token) {
				bridge.send("VKWebAppGetAuthToken", {"app_id": appId, "scope": "photos"})
	            .then(data_access => {
	            	setAccessToken(data_access["access_token"]);
	            	access_token = data_access["access_token"];
	            	publicationResult('post', 0);
	            })
	             
	            .catch(error_access => {
	            	setPopout(null);
				});
	        } else {
	        	publicationResult('post', 0);
	        }
		}*/
	}

	function openVKStory () {
		if(VKImgStory) {
			let stickersStory = [{ "sticker_type": "renderable", "sticker": { "content_type": "image", "blob": stickerStory }}];
			bridge.send("VKWebAppShowStoryBox", {"stickers": stickersStory, "background_type": "image", "blob": VKImgStory, "attachment": { "text": "open", "type": "url", "url": urlPublication }})
			.then(data_story => {
				setPublicationStory(null);
				VKImgStory = null;
			});
		}
	}

	function groupModal () {
		let j = 1;
		{groupList.map((groupId) => {
	    	bridge.send('VKWebAppJoinGroup', { group_id: groupId })
	    	.then(data_join => {
				if (data_join.result) {
				  	if(j == 0) {
				  		setOpenGroupPage(1);
				  	} else {
				  		setOpenGroupPage(0);
				  	}
				  	j = 1;
				}

				if(groupList[groupList.length - 1] == groupId) {
					if(VKImgPost) {
				 		//openModal('story');
				 	} else {
				 		//openModal('post');
				 	}
				}
			})

			.catch(error_join => {
				setOpenGroupPage(1);
				j = 0;

				if(groupList[groupList.length - 1] == groupId) {
					if(VKImgPost) {
				 		//openModal('story');
				 	} else {
				 		//openModal('post');
				 	}
				}
			});
	    })};
	}

	let joinAll = 1;

	function actionAfterGroup(nAction) {
		if(nAction == 2) {
			setOpenGroupPage(1);
			axios.get(site + "event?type=cancel_1&" + getParams);
			joinAll = 1;
		}

		if(joinAll == 1) {
			if(nAction == 1) {
				setOpenGroupPage(0);
				axios.get(site + "event?type=join_1&" + getParams);
			}

			if(openTest == 0) {
				setActivePanel("what_photo");
				/*getResult('ava', textId, imagePath);
				startLoad(1);*/
			} else {
				setActivePanel('image_partner');
			}
		}

		setPopout(null);
	}

	function windowGroup (groupId, j = 1, iGroup = 0) {
		if(Number.isInteger(groupId)) {
		bridge.send('VKWebAppJoinGroup', { group_id: groupId })
	    	.then(data_join => {
				if (data_join.result) {
				  	/*if(j == 1) {
				  		setOpenGroupPage(0);
				  	}*/

				  	if(groupList[groupList.length - 1] == groupId) {
						actionAfterGroup(1);
					} else {
						windowGroup(groupList[iGroup+1], 1, iGroup+1);
					}

					/*groupList.splice(0, 1);
					setGroupList(groupList);*/
				} else {
					joinAll = 0;
					if(groupList[groupList.length - 1] == groupId) {
						actionAfterGroup(1);
					} else {
						windowGroup(groupList[iGroup+1], 0, iGroup+1);
					}
				}
			})

			.catch(error_join => {
				//setOpenGroupPage(1);
				joinAll = 0;
				if(groupList[groupList.length - 1] == groupId) {
					actionAfterGroup(1);
				} else {
					windowGroup(groupList[iGroup+1], 0, iGroup+1);
				}
			});
		} else {
			actionAfterGroup(1);
		}
	}

	function group (typeEvent) {
		setJoinGroup(1);
		if(typeEvent == 1) {
			//axios.get(site + "event?type=join_1&" + getParams);
			setPopout(<ScreenSpinner size='large' />);
			let i = 0;
			windowGroup(groupList[0]);
		} else {
			actionAfterGroup(2);
			//axios.get(site + "event?type=cancel_1&" + getParams);
		}
	}

	function access (typeEvent) {
		if(typeEvent == 1) {
			axios.get(site + "event?type=join_2&" + getParams);
			bridge.send("VKWebAppGetAuthToken", {"app_id": appId, "scope": "photos"})
            .then(data_access => {
            	setAccessToken(data_access["access_token"]);
            	access_token = data_access["access_token"];
            	setOpenAccessPage(0);
            	/*setPopout(<ScreenSpinner size='large' />);
            	openResult(1);*/
            	openResult(1, 0);
            	/*setTimeout(function () {
            		setResultImageUrlPost(viewResult["post"]);
            		imgPost = viewResult["post"];
            		setTextAlbum(viewResult['text_album']);
				  	text_album = viewResult['text_album'];
				  	setTextPublication(viewResult['text_publication']);
				  	text_publication = viewResult['text_publication'];
            		openVKPost();
            	}, (joinGroup == 0 ? 7000 : 15000));*/
            	startLoad(3);
            })
             
            .catch(error_access => {
				/*setPopout(<ScreenSpinner size='large' />);
				openResult();*/
				/*setTimeout(function () {
					openVKAd();
				}, (joinGroup == 0 ? 7000 : 15000));*/
				startLoad(3);
			});
		} else {
			//bridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' });
			/*setPopout(<ScreenSpinner size='large' />);
			openResult();*/
			/*setTimeout(function () {
				openVKAd();
			}, (joinGroup == 0 ? 7000 : 15000));*/
			startLoad(3);
			axios.get(site + "event?type=cancel_2&" + getParams);
		}
	}

	function clickStory (typeEvent) {
		if(typeEvent == 1) {
			if(VKImgStory) {
				/*startLoad(3);
        		setStory(1);*/
        		openVKStory();
        		openResult();
			} else {
				setPopout(<ScreenSpinner size='large' />);
				bridge.send("VKWebAppGetAuthToken", {"app_id": appId, "scope": "photos"})
	            .then(data_access => {
	            	setAccessToken(data_access["access_token"]);
	            	access_token = data_access["access_token"];
	            	setOpenAccessPage(0);
	            	openResult(1, 0);
	            	/*setStory(1);
					startLoad(3);*/
					let intervalCheckStory = setInterval(function () {
						if(VKImgStory) {
							clearInterval(intervalCheckStory);
							openVKStory();
							openResult();
						}
					}, 1000);
	            })
	             
	            .catch(error_access => {
					/*setStory(0);
					startLoad(3);*/
					openResult();
					setPopout(null);
				});
        	}
		} else {
			/*setStory(0);
			startLoad(3);*/
			openResult();
		}
	}

	function allowMessages (groupId) {
		/*bridge.send('VKWebAppAllowMessagesFromGroup', {group_id: groupId})
        .then(data_access => {
        	axios.get(site + "event?type=messages&" + getParams);
			setStory(0);
			startLoad(2);
			setPopout(null);
        })
         
        .catch(error_access => {
			setStory(0);
			startLoad(2);
			setPopout(null);
		});*/

		setStory(0);
		startLoad(2);
		setPopout(null);
	}

	function clickMessages (typeEvent) {
		if(typeEvent == 1) {
			setPopout(<ScreenSpinner size='large' />);
			axios.get(site + "checkMessages?group_id="+groupMessages+"&" + getParams)
			.then(function (dataMessages) {
				if(dataMessages['data'] == 0) {
					bridge.send('VKWebAppAllowMessagesFromGroup', {group_id: groupMessages, key: 'from_photozone'})
		            .then(data_access => {
		            	allowMessages(225891667);
		            })
		             
		            .catch(error_access => {
		            	allowMessages(225891667);
					});
		        } else {
		        	allowMessages(225891667);
		        }
	        })

	        .catch(function (errorConfirm) {
	        	allowMessages(225891667);
	        });
		} else {
			setStory(0);
			startLoad(2);
		}
	}

	function startLoad (loadId) {
		setVal(1);
		setActivePanel('load_'+loadId);

		let valueLoad = 0;
		let timeLoad  = (30 - timeAd) * 10;
		if(timeLoad < 150) {
			timeLoad = 150;
		}
		let intervalLoad = setInterval(() => {
			if(valueLoad < 100) {
				/*if(loadId == 3 && access_token) {
					valueLoad += 12.5;
				} else {
					valueLoad += 6.67;
				}*/
				valueLoad += 1;
				setVal(valueLoad);
			} else {
				clearInterval(intervalLoad);
				/*if(loadId == 3 && access_token) {
					openVKPost();
					setActivePanel('story');
				} else {*/
					setPopout(<ScreenSpinner size='large' />);
					bridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' })
					.then(successViewAd => {
						timeAd = 0;
						if(loadId == 1) {
							if(viewResult['error']) {
								openResult();
							} else {
								setActivePanel('messages');
							}
						}

						if(loadId == 2) {
							openVKStory();
							setActivePanel('access');
						}

						if(loadId == 3) {
							//setActivePanel('story');
        					openResult();
						}
						setPopout(null);
					})

					.catch(errorViewAd => {
						timeAd = 0;
						if(loadId == 1) {
							if(viewResult['error']) {
								openResult();
							} else {
								setActivePanel('messages');
							}
						}

						if(loadId == 2) {
							openVKStory();
							setActivePanel('access');
						}

						if(loadId == 3) {
							//setActivePanel('story');
        					openResult();
						}
						setPopout(null);
					});
				//}
			}
		}, timeLoad);

		/*if(loadId != 2) {
			bridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' });
		}

		if(loadId == 1) {
			setPopout(<ScreenSpinner size='large' />);
			let interval = setInterval(function () {
				if(viewResult != "") {
					clearInterval(interval);
					if(viewResult['error']) {
						openResult();
					} else {
						setActivePanel('access');
					}
					setPopout(null);
				}
			}, 200);
		}

		if(loadId == 2) {
			setActivePanel('story');
		}

		if(loadId == 3) {
			if(story) {
				openVKStory();
			}
			setActivePanel('spinner');
			openResult();
		}*/
	}



	let userPhotos = [];
	let imageIds = [];
	function viewPhotosProfile () {
		setPopout(<ScreenSpinner size='large' />);
		bridge.send("VKWebAppGetAuthToken", {"app_id": appId, "scope": "photos"})
        .then(data_access => {
        	setAccessToken(data_access["access_token"]);
        	access_token = data_access["access_token"];
        	setOpenAccessPage(0);
            
			bridge.send("VKWebAppCallAPIMethod", {"method": "photos.get", "params": { "album_id": "profile", "v":"5.131", "access_token":access_token, "rev": 1, "count": 50 }})
	        .then(data_photos => {
	        	let i = 0;
	        	userPhotos = data_photos["response"]["items"];
	            {data_photos["response"]["items"].map((photo) => {
	            	i += 1;
	            	photosList.push(
	            		<HorizontalCell key={photo["sizes"][photo["sizes"].length - 1]['url']} size={250} id={i}>
		                    <Avatar id={i} size={250} src={photo["sizes"][photo["sizes"].length - 1]['url']} style={{ borderRadius: "10px" }} onClick={(e) => photoChange(e)}>
			                    
		                    </Avatar>
		                </HorizontalCell>
	            	);

	            	imageIds[photo["sizes"][photo["sizes"].length - 1]['url']] = i;
	           	})};

	           	console.log(photosList);
	           	console.log(photosList.length);
	           	console.log('ok');

	            if(photosList.length > 0) {
	           		setActivePanel('viewPhotosProfile');
	           	} else {
	           		openModal('error_photos');
	           	}
	           	setPopout(null);
	        })

	        .catch(error_album => {
	        	console.log(error_album);
	            openModal('error_photos');
	            setPopout(null);
	        });
        })
             
        .catch(error_access => {
        	console.log(error_access);
        	openModal('error_access_photos');
        	setPopout(null);
		});
	}

	function photoChange (imgInfo) {
		let imgId = imageIds[imgInfo.target.attributes.src.nodeValue];
		let updPhotosList = [];
		let i = 0;
		let avaSrc = null;
		{userPhotos.map((photo) => {
			i += 1;
			updPhotosList.push(
	    		<HorizontalCell key={photo["sizes"][photo["sizes"].length - 1]['url']} size={250} id={i}>
		            <Avatar id={i} size={250} src={photo["sizes"][photo["sizes"].length - 1]['url']} style={{ borderRadius: "10px" }} onClick={(e) => photoChange(e)}>
	                    {imgId == i && <Avatar.Badge background="shadow" style={{ margin: "5%"}} id={i}>
	                        <Icon20CheckCircleFillGreen width={28} height={28} id={i} />
	                    </Avatar.Badge>}
	                </Avatar>
	            </HorizontalCell>
	    	);
	    	if(imgId == i) {
	    		avaSrc = photo["sizes"][photo["sizes"].length - 1]['url'];
	    	}
		})};

		setPhotosList(updPhotosList);
		setAvatarUrl(avaSrc);
		setDisabledButtonChange(false);
	}

	function changeImg () {
		setPopout(<ScreenSpinner size='large' />);
		let form_data = new FormData();
		form_data.append("photo_ava", avatarUrl);
		viewResult = "";
		startLoad(1);
		getResult('ava', textId, imagePath, form_data);
	}

	let timeout = "";
	if(activePanel == 'load_1' || activePanel == 'load_2' || activePanel == 'load_3') {
		/*let timeLoad = 150;
		if((activePanel == 'load_1' || activePanel == 'load_2') && joinGroup == 0)  {
			timeLoad = 70;
		}
		timeout = setTimeout(function () {
			if(val < 100) {
				//setVal(val + 1);
			} else {
				if(activePanel != 'load_3' && !(activePanel == 'load_1' && joinGroup == 0)) {
					bridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' });
				}
				if(activePanel == 'load_1') {
					if(viewResult['error']) {
						openResult();
					} else {
						setActivePanel('messages');
					}
				}

				if(activePanel == 'load_2') {
					clearTimeout(timeout);
					setActivePanel('access');
				}

				if(activePanel == 'load_3') {
					if(story) {
						//openVKStory();
					}
					clearTimeout(timeout);
					setActivePanel('story');
					//openResult();
				}
			}
		}, timeLoad);*/
	}

	function runApp () {
		setPopout(<ScreenSpinner size='large' />);
		axios.get(site + "user?type=confirm&hash="+imgHash+"&" + getParams)
			.then(function (userConfirm) {
				getUserInfo(userConfirm, 1);
			})

			.catch(function (errorConfirm) {
				setActivePanel('error_app');
				setPopout(null);
			});
	}

	let margin = "16%";
	if(platform === Platform.VKCOM) {
		margin = "0%";
	}

	let more = 0;
	let heightReturnRow = 0;

	let countGroupAdd = 0;
	function windowGroupResult (groupId, goToPanelImages = 1, iGroup = 0) {
		if(Number.isInteger(groupId)) {
			setPopout(<ScreenSpinner size='large' />);
			bridge.send('VKWebAppJoinGroup', { group_id: groupId })
	    	.then(data_join => {
				if (data_join.result) {
				  	// countGroupAdd++;

				  	if(groupsBonus[groupsBonus.length - 1] == groupId) {
						axios.get(site + "event?type=ad&" + getParams);
						// setChangeImgOpen(1);
						if(goToPanelImages == 1) {
							setChangeImgOpen(0); setOpenTest(0); setFileDataPartner(""); setOpenGroupPage(1); setOpenAccessPage(1); setJsonResult(""); setImagePath(null); getLooksFeed(1, 1); setActivePanel('images');
						}
						setPopout(null);
					} else {
						windowGroupResult(groupsBonus[iGroup+1], goToPanelImages, iGroup+1);
					}

					groupsBonus.splice(0, 1);
					setGroupsBonus(groupsBonus);
				} else {
					setPopout(null);
				}
			})

			.catch(error_join => {
				setPopout(null);
			});
		} else {
			axios.get(site + "event?type=ad&" + getParams);
			// setChangeImgOpen(1);
			setChangeImgOpen(0); setOpenTest(0); setFileDataPartner(""); setOpenGroupPage(1); setOpenAccessPage(1); setJsonResult(""); setImagePath(null); getLooksFeed(1, 1); setActivePanel('images');
		}
	}

	//  style={{ backgroundImage: "url("+imgBackground+")", backgroundAttachment: "fixed", paddingTop: "40%" }}
	//  style={{ color: "white" }}

	// {viewBanner == 1 && <a href="https://vk.com/app51748467#utm_campaign=promo&utm_source=fotoz" target="_blank"><img src={imgOb} style={{ display: "block", margin: "0 auto", width: "95%" }} onClick={() => axios.get(site + "event?type=ob&" + getParams)} /></a> }

	let heightViewRowsValues = heightViewRows;

	function startTrackingScroll (rowImages = images, user_info = fetchedUser) {
		if(user_info.sex == 1) {
			let scrollTopNumber = 0;
			let timeScroll = 0;
			let maxValueScroll = maxScroll;
			let maxUpdate = 0;
			let listSendImages = listSaveSentImages;
			intervalScroll.current = setInterval(() => {
				timeScroll += 1;
				//scrollTopNumber = document.querySelector("#root").scrollTop;
				scrollTopNumber = pageYOffset;
				//console.log(scrollTopNumber);
				if(scrollTopNumber > maxValueScroll) {
		      		setMaxScroll(scrollTopNumber);
		      		maxValueScroll = scrollTopNumber;
		      		//console.log('update!');
		    		maxUpdate = 1;
		      	}

		      	if(maxUpdate == 1 && timeScroll >= 5) {
		      		maxUpdate = 0;
		      		//let countImages = Math.floor((scrollTopNumber + window.innerHeight - 50) / 230) * (platform === Platform.VKCOM ? 4 : 2);
		      		
		      		let newViews = 0;
		      		let heightProcessed_rows = [];
		      		let sendImages = [];
		      		let stopHeight = scrollTopNumber + window.innerHeight - 50;

		      		{rowImages[0].map((imagesThisRow, indexThisRow) => {
						heightProcessed_rows.push(0);
						{imagesThisRow.map((imageInfo) => {
							if(heightProcessed_rows[indexThisRow] + imageInfo['height_number'] <= stopHeight) {
				  				heightProcessed_rows[indexThisRow] += imageInfo['height_number'];
				  				if(listSendImages.indexOf(imageInfo['id']) == -1) {
				  					sendImages.push(imageInfo['id']);
				  					listSendImages.push(imageInfo['id']);
				  					newViews = 1;
				  				}
			  				}
		  				})}
					})};

	      			/*
	      			while(countImages > countSendImages) {
	      				sendImages.push(listImages[countSendImages]);
	      				countSendImages += 1;
	      				newViews = 1;
	      			}*/
	      			if(newViews == 1) {
		      			setListSaveSentImages(listSendImages);
		      			//console.log('send '+countImages+': '+sendImages.join(','));
		      			let viewsData = new FormData();
		      			viewsData.append('images', sendImages.join(','));

		      			axios({
							method: "post",
							url: site + "views?" + getParams,
							data: viewsData
						});
		      			timeScroll = 0;
		      		}
		      	}
		    }, 1000);
		}
	}

	function stopTrackingScroll () {
		if(fetchedUser.sex == 1) {
			clearInterval(intervalScroll.current);
			let scrollTopNumber = pageYOffset;
			let listSendImages = listSaveSentImages;
			/*let countImages = Math.floor((scrollTopNumber + window.innerHeight - 50) / 230) * (platform === Platform.VKCOM ? 4 : 2);
			let sendImages = [];
			
			while(countImages > countSendImages) {
				sendImages.push(listIdsImages[countSendImages]);
				countSendImages += 1;
			}*/

			let countImages = 0;
      		let heightProcessed_rows = [];
      		let sendImages = [];
      		let stopHeight = scrollTopNumber + window.innerHeight - 50;
      		let newViews = 0;

      		{images[0].map((imagesThisRow, indexThisRow) => {
				heightProcessed_rows.push(0);
				{imagesThisRow.map((imageInfo) => {
					if(heightProcessed_rows[indexThisRow] + imageInfo['height_number'] <= stopHeight) {
		  				heightProcessed_rows[indexThisRow] += imageInfo['height_number'];
		  				if(listSendImages.indexOf(imageInfo['id']) == -1) {
		  					sendImages.push(imageInfo['id']);
		  					listSendImages.push(imageInfo['id']);
		  					newViews = 1;
		  				}
	  				}
  				})}
			})};

			if(newViews == 1) {
				setListSaveSentImages(listSendImages);
				//console.log('save '+countImages+': '+sendImages.join(','));
				let viewsData = new FormData();
				viewsData.append('images', sendImages.join(','));

				axios({
					method: "post",
					url: site + "views?" + getParams,
					data: viewsData
				});
			}
		}
	}

	/*
					<Placeholder
				      icon={<Icon201CircleFillGold width={150} height={150} style={{ marginBottom: "30px" }} />}
				      action={
				          <ButtonGroup mode="vertical" align="center">
				            <Button size="l" mode="primary" onClick={() => group(1)} stretched>Получить +1 Образ</Button>
				            <Button size="l" mode="secondary" onClick={() => group(2)} stretched>Пропустить</Button>
				          </ButtonGroup>
				      }
				    >
				      <h1 style={{ fontSize: "18px", marginBottom: "40px", color: "black" }}>Подпишитесь на нас, чтобы<br/>получить
					  дополнительный образ.</h1>
				    </Placeholder>
	*/

	let questions = [
		{
			question: "Доверяете ли вы своему партнеру?",
			answers: [
				"Да, у нас доверительные отношения.",
				"Нет, это не настолько близкий мне человек"
			]
		},

		{
			question: "Как вы решаете конфликты?",
			answers: [
				"Обсуждаем проблему, пока не найдем компромисс.",
				"Иногда обсуждаем, иногда отступаем.",
				"Часто избегаем обсуждения, чтобы не усугублять.",
				"Игнорируем проблему, каждый остается при своем."
			]
		},

		{
			question: "Как вы относитесь к друзьям партнера?",
			answers: [
				"Они стали и моими друзьями.",
				"Нравятся, но не все.",
				"Редко общаемся, предпочитаю не вмешиваться.",
				"Совсем не общаемся, у нас разные круги общения."
			]
		},

		{
			question: "Как часто вы делаете что-то особенное, чтобы показать физическую привлекательность вашего партнера?",
			answers: [
				"Стараюсь как можно чаще.",
				"Часто, каждую неделю или каждый месяц.",
				"Иногда, по особым случаям или датам.",
				"Никогда или очень редко."
			]
		},

		{
			question: "Как вы решаете финансовые вопросы?",
			answers: [
				"У нас общий бюджет, все решения принимаем вместе.",
				"У каждого свой бюджет, но есть общие расходы.",
				"Полностью раздельный бюджет, каждый тратит на себя."
			]
		},

		{
			question: "Как вы проводите отпуск?",
			answers: [
				"Всегда вместе выбираем место, которое нравится обоим.",
				"Чаще вместе, но иногда позволяем себе отдыхать по отдельности.",
				"Раздельно, у нас разные предпочтения в отдыхе.",
				"Почти никогда не отдыхаем вместе, у нас слишком разные интересы."
			]
		}

	];

	function answerSend (qAnswer) {
		if(qAnswer == 6) {
			bridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' });
			setActivePanel('group');
		} else {
			if(qAnswer == 3) {
				bridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' })
				.then(dataAds => {
					setActivePanel(qAnswer+1);
				})

				.catch(errorAds => {
					setActivePanel(qAnswer+1);
				});
			} else {
				setActivePanel(qAnswer+1);
			}
		}
	}

	function imageDownload_partner (e) {
		setPopout(<ScreenSpinner size='large' />);
    	let url = window.URL || window.webkitURL;
		let form_data = new FormData();
        // typeDownload = "upload";
        let file_data = e.target.files[0]; 
        if(file_data.type == "image/jpeg" || file_data.type == "image/png") {
	        if(file_data.size > 10 * 1024 * 1024) {
	            openModalError(
	            	"Не удалось загрузить изображение",
	            	"Пожалуйста, загрузите фото размером менее 10 Мб"
	            );
	            form_data = new FormData(); 
	            $("#image").val("");
	            setPopout(null);
	        } else {
		        let img = new Image();
		        img.onload = function () {
		            if(this.width > 3000 || this.height > 3000) {
		                openModalError(
			            	"Не удалось загрузить изображение",
			            	"Пожалуйста, загрузите фото меньшего разрешения"
			            );
		                form_data = new FormData();
		                $("#image").val("");
		                setPopout(null);
		            } else {
		            	viewResult = "";
		                setFileDataPartner(file_data);
		                dataImgPartner = file_data;
						startLoad(1);
						getResult('ava', textId, imagePath);
		            }
		        };
		        
		        img.src = url.createObjectURL(file_data);
	        }
        } else {
            openModalError(
            	"Не удалось загрузить изображение",
            	"Пожалуйста, загрузите PNG или JPG картинку"
            );
            form_data = new FormData(); 
            $("#image").val("");
            setPopout(null);
        }
    }


    function openAd (fromPage = 0) {
    	setPopout(<ScreenSpinner size='large' />);
    	setActivePanel('images');
    	setTimeout(function () {
	    	bridge.send('VKWebAppShowNativeAds', {
			  ad_format: 'reward'
			})
			.then((data) => { 
			    if (data.result) { 
			      	if(fromPage == 1) {
			      		setJoinGroup(0);
			      		actionAfterGroup(1);
			      	} else {
			      		axios.get(site + "event?type=ad&" + getParams);
			      		// setChangeImgOpen(1);
			      		setChangeImgOpen(0); setOpenTest(0); setFileDataPartner(""); setOpenGroupPage(1); setOpenAccessPage(1); setJsonResult(""); setImagePath(null); getLooksFeed(1, 1);
			      	}
			    } else {
			      	setActivePanel('result');
			      	setSnackbar(
						<Snackbar
					        onClose={() => setSnackbar(null)}
					        duration={5000}
					        before={
					            <Avatar size={24} style={{ background: 'var(--vkui--color_background_negative)' }}>
						            <Icon12Cancel fill="#fff" width={14} height={14} />
						        </Avatar>
					        }
					    >
					        Не удалось загрузить рекламу. Пожалуйста, попробуйте позже
					    </Snackbar>
					);
					setPopout(null); 
			    }
			})
			.catch((error) => { 
				setActivePanel('result');
				setSnackbar(
					<Snackbar
				        onClose={() => setSnackbar(null)}
				        duration={5000}
				        before={
				            <Avatar size={24} style={{ background: 'var(--vkui--color_background_negative)' }}>
					            <Icon12Cancel fill="#fff" width={14} height={14} />
					        </Avatar>
				        }
				    >
				        Не удалось загрузить рекламу. Пожалуйста, попробуйте позже
				    </Snackbar>
				);
				setPopout(null);
			});
		}, 1000);
    }

    /*
				<div>
					<Group>
						<div style={{ color: "gray", fontSize: "18px", margin: "5% 5%" }} onClick={() => group(2)}>Пропустить</div>
						<div style={{ margin: "0 10%" }}>
							<img src={imgGroups1} style={{ padding: "20% 0", width: "150px", display: "block", marginLeft: "auto", marginRight: "auto" }} />
							<div style={{ margin: "20px 0" }}>
								<Title level="2">Подпишитесь на нас. Получите дополнительную генерацию.</Title>
							</div>
							<div>
								<Button stretched size="l" sizeY="regular" mode="primary" onClick={() => group(1)}>Подписаться +1 генерация</Button><br/>
							</div>
						</div>
					</Group>
				</div>

				<div>
					<Group>
						<div style={{ color: "gray", fontSize: "18px", margin: "5% 5%" }} onClick={() => access(2)}>Пропустить</div>
						<div style={{ margin: "0 10%" }}>
							<img src={imgAccess2} style={{ padding: "20% 0", width: "150px", display: "block", marginLeft: "auto", marginRight: "auto" }} />
							<div style={{ margin: "20px 0" }}>
								<Title level="2">Опубликуйте результат. Это возможность получить много лайков от друзей!</Title>
							</div>
							<div>
								<Button stretched size="l" sizeY="regular" mode="primary" onClick={() => access(1)}>Опубликовать результат</Button><br/>
							</div>
						</div>
					</Group>
				</div>

				<div>
					<Group>
						<div style={{ color: "gray", fontSize: "18px", margin: "5% 5%" }} onClick={() => clickMessages(2)}>Пропустить</div>
						<div style={{ margin: "0 10%" }}>
							<Icon56MessagesOutline style={{ color: "rgb(0, 140, 255)", padding: "20% 0", width: "150px", height: "150px", display: "block", marginLeft: "auto", marginRight: "auto" }} />
							<div style={{ margin: "20px 0" }}>
								<Title level="2">Рекомендуем разрешить отправку сообщений, чтобы мы могли сделать для Вас уникальное предложение!</Title>
							</div>
							<div>
								<Button stretched size="l" sizeY="regular" mode="primary" onClick={() => clickMessages(1)}>Разрешить</Button><br/>
							</div>
						</div>
					</Group>
				</div>

    */

    /*

    */

    /*
			<Panel id="limit">
				<Group>
					<Div>
						<div stlye={{width: "100%"}}><img src={imgLimit} style={{ width: "80px",  display: "block", margin: "0 auto" }} /></div>
						<br/>
						<div style={{ textAlign: "center" }}><b >Ваши попытки закончились</b></div>
						<div style={{ color: "gray", textAlign: "center" }}>Получите дополнительную генерацию за подписку или возвращайтесь завтра с новой попыткой!</div><br/>
						<Button stretched size="m"  mode="primary" onClick={() => { windowGroupResult(groupList[0], 1); }}>
				          Подписаться +1 генерация
				        </Button>
			        </Div>
				</Group>
			</Panel>
    */

    function getLooksFeed (categoryView, start=0, g=gender, currentImages=images, sendUserInfo=fetchedUser, hashOpenApp = imgHash) {
	    if(categoryView == 1 && g == 1) {
	    	setPopout(<ScreenSpinner size='large' />);
	    	axios.get(site + "getLooksFeed?offset="+offsetFeed+"&g="+g+"&category=1&width="+window.innerWidth+"&hash="+hashOpenApp+"&" + getParams)
			.then(function (looksFeed) {
				if(looksFeed['data']['response']) {
					if(start == 1) {
						currentImages[0] = [];
					}
					let indexRow = 0;
					{looksFeed['data']['response'].map((returnRowLooks) => {
						if(!currentImages[0][indexRow]) {
							currentImages[0].push([]);
						}
						currentImages[0][indexRow] = currentImages[0][indexRow].concat(returnRowLooks);
						indexRow += 1;
					})}
					setImages(currentImages);
					setOffsetFeed(offsetFeed+1);
					if(start == 0) {
						clearInterval(intervalScroll.current);
					}
					startTrackingScroll(currentImages, sendUserInfo);
		        } else {
		        	setSnackbar(
		        		<Snackbar
					        onClose={() => setSnackbar(null)}
					        duration={7000}
					        before={
					            <Icon24ErrorCircleOutline style={{ color: 'var(--vkui--color_background_accent)' }} />
					        }
					    >
					        {looksFeed['data']['msg'] == 'no looks' ? "Лента образов закончилась" : "Сессия не активна. Пожалуйста, перезапустите приложение"}
					    </Snackbar>
		        	);
		        }
		        setPopout(null);
	        })

	        .catch(function (error) {
	        	setSnackbar(
	        		<Snackbar
				        onClose={() => setSnackbar(null)}
				        duration={7000}
				        before={
				            <Icon24ErrorCircleOutline style={{ color: 'var(--vkui--color_background_accent)' }} />
				        }
				    >
				        Не удалось загрузить образы
				    </Snackbar>
	        	);
				setPopout(null);
	        });
	    } else {
	    	if(start == 0) {
	    		heightViewRowsValues[activeTabCategory - 1] += 2300; setHeightViewRows(heightViewRowsValues); setCountClicksViewBlocks(countClicksViewBlocks+1);
	    	}
	    }
    }

    /*
    	<Title level="2">{(changeImgOpen == 0 && countResults < 10) ? "Посмотрите рекламный ролик. Получите дополнительную генерацию" : "Ваш результат готов. Не забудьте показать результат друзьям!"}</Title>
		{(changeImgOpen == 0 && countResults < 10 && groupsBonus.length > 0) && <Button stretched size="l" sizeY="regular" mode="primary" onClick={() => { windowGroupResult(groupsBonus[0]); }}>Подписаться +1 образ</Button>}
		{(changeImgOpen == 0 && countResults < 10 && groupsBonus.length == 0) && <Button stretched size="l" sizeY="regular" mode="primary" onClick={() => { openAd(); }}>Рекламный ролик +1 образ</Button>}
		{changeImgOpen == 1 && 
    */

	return [
		<Root activeView={activeView}>
		<View activePanel={activePanel} id="panelsApp">

			<Panel id="spinner">
				<Group>
					<Div style={{ textAlign: "center" }}>
						<Spinner size="large" style={{ margin: '20px 0' }} />
					</Div>
				</Group>
			</Panel>

			<Panel id="error_app">
				<Group>
					<Div style={{ textAlign: "center" }}>
						Приложение на технических работах и временно недоступно
					</Div>
				</Group>
			</Panel>

			<Panel id="start">
				<Group>
					<br/>
					<Div>
						<img src={imgApp} style={{ width: "30%" }}/>
					</Div>
					<Div><b>Перевоплощение</b></Div>
				</Group>

				<FixedLayout filled vertical="bottom">
					<Div>
						<a href="https://vk.com/app52357995" style={{ textDecoration: "none" }} target="_blank">
							<Button stretched size="l" sizeY="regular" mode="primary" onClick={() => { runApp(); }} >
								ЗАПУСТИТЬ
							</Button>
						</a>
					</Div>
	          		<Separator wide />
			        <Div style={{ textAlign: "center", color: "gray", fontSize: "14px" }}>
			          	Нажимая на кнопку «Запустить», Вы соглашаетесь с <a href="https://docs.google.com/document/d/1fzvZ-CtKqsaiua-xSzfPLkilumQ0jUD5rugqe03d6xk/edit" target="_blank">пользовательским соглашением</a> и <a href="https://docs.google.com/document/d/1oYUEWTkhUwrAq3eKwnuk4pBb40wkvLDeo_8M4bqJT1o/edit" target="_blank">политикой конфиденциальности</a>
			        </Div>
	        	</FixedLayout>
			</Panel>

			<Panel id="images">
				{(images && images[0][0].length > 0) &&
					<div>
						<Div>
						<div style={{ display: "flex", justifyContent: "center", "grid-gap": "0.25%" }}>
							{images[activeTabCategory - 1].map((imagesBlock) => {
								heightReturnRow = 0;
								return [
								<div style={{ width: imagesBlock[0]['width'] }}>
									{imagesBlock.map((imageInfo) => {
					  					if(heightViewRows[activeTabCategory - 1] > heightReturnRow || activeTabCategory == 1) {
											heightReturnRow += imageInfo['height_number'];
						  					return [ <div style={{ margin: "1.5% 0", backgroundImage: "url("+imageInfo['url']+")", borderRadius: "15px", backgroundPosition: "center center", backgroundSize: "cover", width: "100%", height: imageInfo['height']}} onClick={(e) => { if(activeTabCategory == 1) { stopTrackingScroll(); } openVKAd(); axios.get(site + "event?type=img&" + getParams); setChangeImgUrl(imageInfo['url']); setImagePath(imageInfo['path']); setOffsetFeed(0); if(imageInfo['test'] == 0) { setActivePanel('group'); } else { setOpenTest(1); setActivePanel(1); } }}>
						  					</div> ];
						  				} else {
											more = 1;
										}
					  				})}
								</div> ];
			  				})}
			  			</div>

		  				{(more == 1 || activeTabCategory == 1) && <Button stretched size="l" sizeY="regular" mode="primary" onClick={() => { openVKAd(); getLooksFeed(activeTabCategory); }}>Загрузить ещё образы</Button>}
		  				</Div>

		  				<div style={{ paddingTop: "48px" }}></div>

			  			<FixedLayout filled vertical="bottom">
					        <Separator wide />
					            <Tabs mode="accent">
					            <HorizontalScroll arrowSize="m">
					            {categoriesList.map((categoryInfo) => 
						            <TabsItem status={ (platform !== Platform.VKCOM && categoryInfo['id'] == 2) && <Counter mode="prominent" size="s">+{numCounter}</Counter> } selected={activeTabCategory === categoryInfo['id']} onClick={() => { if(categoryInfo['id'] != activeTabCategory) { openVKAd(); } if(categoryInfo['id'] == 1 && activeTabCategory != 1) { startTrackingScroll(); } if(categoryInfo['id'] != 1 && activeTabCategory == 1) { stopTrackingScroll(); }  setActiveTabCategory(categoryInfo['id']); }}>
						              	{categoryInfo['name']}
						            </TabsItem>
						        )}
						        </HorizontalScroll>
					            </Tabs>
				        </FixedLayout>
			        </div>
		    	}
		    	{snackbar}
			</Panel>

			{questions.map((questionInfo, questionId) => 
				<Panel id={questionId+1}>
					<PanelHeader>Вопрос {questionId+1}/6</PanelHeader>
					<Group>
						<img src={"images_app_newyear-mood/"+activePanel+".jpg"} style={{ maxWidth: "70%", display: "block", margin: "0 auto", borderRadius: "20px" }} />
		            	<br />
						<Div style={{ textAlign: "center", color: "gray", fontSize: "20px" }}><b>{questionInfo['question']}</b></Div>
						<RadioGroup onChange={(e) => { answerSend(questionId+1); }}>
							{questionInfo['answers'].map((buttonText) => 
								<Radio>{buttonText}</Radio>
							)}
						</RadioGroup>
					</Group>
				</Panel>
			)}

			<Panel id="group">
				{v == 1 ? 
				<div>
					<Group>
						<div style={{ color: "gray", fontSize: "18px", margin: "5% 5%" }} onClick={() => group(2)}>Пропустить</div>
						<img src={imgGroups} style={{ paddingTop: "20%", width: "45%", display: "block", marginLeft: "auto", marginRight: "auto" }} />
						<b><Div style={{ textAlign: "center" }}>
							{groupList.length < 0 ? "Посмотри рекламу и получи дополнительное преображение!" : <b>Получай интересный контент<br/>уже сейчас - Подпишись!</b>}
						</Div></b>
						<FixedLayout filled vertical="bottom">
							<Div>
								{groupList.length < 0 ?  
								<Button stretched size="l" sizeY="regular" mode="primary" onClick={() => openAd(1)}>Посмотреть</Button>
								:
								<Button stretched size="l" sizeY="regular" mode="primary" onClick={() => group(1)}>Подписаться</Button>
								}
							<br/>
							</Div>
						</FixedLayout>
					</Group>
				</div> : 
				<div>
					<PanelHeader>Уведомление</PanelHeader>
					<Group>
						<b><Div style={{ textAlign: "center" }}>
							Получай интересный контент уже сейчас - Подпишись!
						</Div></b>
						<img src={imgGroups} style={{ width: "45%", display: "block", marginLeft: "auto", marginRight: "auto" }} />
						<Div>
							<Button stretched size="l" sizeY="regular" mode="primary" onClick={() => group(1)}>{texts[0][0]}</Button><br/>
							<Button stretched size="l" sizeY="regular" mode="secondary" onClick={() => group(2)}>{texts[0][1]}</Button>
						</Div>
					</Group>
				</div> }
			</Panel>

			<Panel id="what_photo">
				<Group>
					<div style={{ margin: "0 10%" }}>
						<img src={changeImgUrl} style={{ padding: "15% 0", width: "150px", display: "block", marginLeft: "auto", marginRight: "auto" }} />
						<div style={{ margin: "20px 0" }}>
							<Title level="2">Какое фото использовать для этого образа?</Title>
						</div>
						<div>
							<Button stretched size="l" sizeY="regular" mode="primary" onClick={() => { getResult('ava', textId, imagePath); startLoad(1); }}>Своё фото с аватара</Button><br/>
							<File stretched="true" size="l" align="center" id="image" onChange={(e) => { imageDownload(e) }}>Загрузить с устройства</File>
						</div>
					</div>
				</Group>
			</Panel>

			<Panel id="image_partner">
				<PanelHeader>Уведомление</PanelHeader>
				<Div style={{ textAlign: "center" }}>
					Загрузите, пожалуйста, фото <text style={{ color: "red" }}>своего партнера</text>
                </Div>

                <img src={imgPartner} style={{ width: "250px", display: "block", marginLeft: "auto", marginRight: "auto", borderRadius: "20px" }} />

				<Div>
					<File stretched="true" size="l" align="center" id="image" onChange={(e) => { imageDownload_partner(e) }}>Загрузить фото</File>
				</Div>
			</Panel>

			<Panel id="load_1">
				<PanelHeader>Загрузка...</PanelHeader>
				<Group>
					<br/>
	                <Div>
	                	<b><div style={{ fontSize: "20px", textAlign: "center" }} class="load-txt">Чуточку терпения, преображаем вас...</div></b>
                	</Div>
	                <FormItem id="progresslabel"><Progress aria-labelledby="progresslabel" value={val}/></FormItem>
                </Group>
			</Panel>

			<Panel id="image_partner_error">
				<PanelHeader>Уведомление</PanelHeader>
				<Div style={{ textAlign: "center" }}>
					К сожалению, мы не смогли сгенерировать результат по одной из этих причин:
                    <br/><br/>
                    1. На фото партнёра нет лица.<br/>
                    2. На фото партнёра более одного лица.<br/>
                    3. Фото партнёра плохого качества. 
					Загрузите, пожалуйста, другое фото <text style={{ color: "red" }}>своего партнера</text>
                </Div>

                <img src={imgWarn} style={{ width: "250px", display: "block", marginLeft: "auto", marginRight: "auto", borderRadius: "20px" }} />

				<Div>
					<File stretched="true" size="l" align="center" id="image" onChange={(e) => { imageDownload_partner(e) }}>Загрузить фото</File>
				</Div>
			</Panel>

			<Panel id="error">
				<PanelHeader>Уведомление</PanelHeader>
				<Div style={{ textAlign: "center" }}>
					К сожалению, мы не смогли сгенерировать результат по одной из этих причин:
                    <br/><br/>
                    1. На фото нет вашего лица.<br/>
                    2. На фото более одного лица. <br/>
                    3. Фото плохого качества. 
                    <br/><br/>
                    <div style={{ color: "red" }}>Выберите вариант загрузки другого фото</div>
                </Div>

                <img src={imgWarn} style={{ width: "250px", display: "block", marginLeft: "auto", marginRight: "auto", borderRadius: "20px" }} />

                <Div>
					<Button stretched size="l" sizeY="regular" mode="primary" onClick={() => { viewPhotosProfile(); }} >
						Загрузить из профиля
					</Button>
				</Div>

				<Div>
					<File stretched="true" size="l" align="center" id="image" onChange={(e) => { imageDownload(e) }}>Загрузить с устройства</File>
				</Div>
			</Panel>

			<Panel id="viewPhotosProfile">
				<HorizontalScroll><div style={{ display: 'flex' }}>
					{photosList}
				</div></HorizontalScroll>
				<br/>
				<Div style={{ textAlign: "center"}}>
					<b>Нажмите на изображение для выбора</b>
				</Div>
				<Div>
					<Button stretched size="l" sizeY="regular" mode="primary" onClick={() => { changeImg(); }} disabled={disabledButtonChange}>
						<b>Подтвердить выбор</b>
					</Button>
				</Div>
				<Div>
					<Button stretched size="l" sizeY="regular" mode="secondary" onClick={() => { setActivePanel('error'); }}>
						<b>Назад</b>
					</Button>
				</Div>
			</Panel>

			<Panel id="messages">
				{v == 1 ?
				<Group>
					<div style={{ color: "gray", fontSize: "18px", margin: "5% 5%" }} onClick={() => clickMessages(2)}>Пропустить</div>
					<Icon56MessagesOutline style={{ paddingTop: "20%", color: "rgb(0, 140, 255)", width: "150px", height: "150px", display: "block", marginLeft: "auto", marginRight: "auto" }} />
					<b><Div style={{ textAlign: "center", fontSize: "19px" }}>
						Разрешите сообщения от сообщества и получите уникальное предложение.
					</Div></b>
					<FixedLayout filled vertical="bottom">
						<Div>
							<Button stretched size="l" sizeY="regular" mode="primary" onClick={() => clickMessages(1)}>Разрешить</Button><br/>
						</Div>
					</FixedLayout>
				</Group>
				:
				<div>
					<PanelHeader>Уведомление</PanelHeader>
					<Group>
						<b><Div style={{ textAlign: "center" }}>
							Разрешите сообщения от сообщества и получите уникальное предложение.
						</Div></b>
						<Icon56MessagesOutline style={{ margin: "10% 0", color: "rgb(0, 140, 255)", width: "150px", height: "150px", display: "block", marginLeft: "auto", marginRight: "auto" }} />
						<Div>
							<Button stretched size="l" sizeY="regular" mode="primary" onClick={() => clickMessages(1)}>Разрешить</Button><br/>
							<Button stretched size="l" sizeY="regular" mode="secondary" onClick={() => clickMessages(2)}>Отказаться</Button>
						</Div>
					</Group> 
				</div>
				}
			</Panel>

			<Panel id="load_2">
				<PanelHeader>Загрузка...</PanelHeader>
				<Group>
					<br/>
	                <Div>
	                	<b><div style={{ fontSize: "20px", textAlign: "center" }} class="load-txt">{story ? "Готовимся к публикации истории..." : "Загружаем ваш результат..."}</div></b>
                	</Div>
	                <FormItem id="progresslabel"><Progress aria-labelledby="progresslabel" value={val}/></FormItem>
                </Group>
			</Panel>

			<Panel id="access">
				{v == 1 ?
				<div>
					<Group>
						<div style={{ color: "gray", fontSize: "18px", margin: "5% 5%" }} onClick={() => access(2)}>Пропустить</div>
						<img src={imgAccess} style={{ paddingTop: "20%", width: "45%", display: "block", marginLeft: "auto", marginRight: "auto" }} />
						<b><Div style={{ textAlign: "center" }}>
							Обязательно опубликуйте результат в альбом и получайте десятки лайков от ваших друзей!
						</Div></b>
						<FixedLayout filled vertical="bottom">
							<Div>
								<Button stretched size="l" sizeY="regular" mode="primary" onClick={() => access(1)}>{texts[1][0]}</Button><br/>
							</Div>
						</FixedLayout>
					</Group>
				</div> :
				<div>
					<PanelHeader>Уведомление</PanelHeader>
					<Group>
						<b><Div style={{ textAlign: "center" }}>
							Обязательно опубликуйте результат в альбом и получайте десятки лайков от ваших друзей!
						</Div></b>
						<img src={imgAccess} style={{ width: "45%", display: "block", marginLeft: "auto", marginRight: "auto" }} />
						<Div>
							<Button stretched size="l" sizeY="regular" mode="primary" onClick={() => access(1)}>{texts[1][0]}</Button><br/>
							<Button stretched size="l" sizeY="regular" mode="secondary" onClick={() => access(2)}>{texts[1][1]}</Button>
						</Div>
					</Group>
				</div>
				}
			</Panel>

			<Panel id="load_3">
				<PanelHeader>Загрузка...</PanelHeader>
				<Group>
					<br/>
	                <Div>
	                	<b><div style={{ fontSize: "20px", textAlign: "center" }} class="load-txt">Опубликуйте историю и<br/>вашу запись увидят<br/>сотни людей</div></b>
                	</Div>
	                <FormItem id="progresslabel"><Progress aria-labelledby="progresslabel" value={val}/></FormItem>
                </Group>
			</Panel>

			<Panel id="limit">
				<Group>
					<Icon28WarningTriangleOutline width={150} height={150} style={{ display: "block", marginLeft: "auto", marginRight: "auto", "padding": "15% 0", color: "orange" }} />
					<Div style={{ margin: "0 5%", fontSize: "20px" }}>
						<b>
						Сработал суточный лимит.<br/>
						Получите дополнительную<br/>
						генерацию за подписку.
						</b><br/><br/>
						<Button stretched size="l" sizeY="regular" mode="primary" onClick={() => { windowGroupResult(groupList[0], 1); }} style={{ background: "orange" }}>Подписаться +1 образ</Button>
					</Div>
				</Group>
			</Panel>

			<Panel id="story">
				{v == 1 ?
				<Group>
					<div style={{ color: "gray", fontSize: "18px", margin: "5% 5%" }} onClick={() => clickStory(2)}>{texts[2][1]}</div>
					<Icon56StoryOutline style={{ paddingTop: "20%", color: "rgb(0, 140, 255)", width: "150px", height: "150px", display: "block", marginLeft: "auto", marginRight: "auto" }} />
					<b><Div style={{ textAlign: "center", fontSize: "19px" }}>
						Опубликуйте историю и получайте восторженные комплименты от друзей!
					</Div></b>
					<FixedLayout filled vertical="bottom">
						<Div>
							<Button stretched size="l" sizeY="regular" mode="primary" onClick={() => clickStory(1)}>{texts[2][0]}</Button><br/>
						</Div>
					</FixedLayout>
				</Group>
				:
				<div>
					<PanelHeader>Уведомление</PanelHeader>
					<Group>
						<b><Div style={{ textAlign: "center" }}>
							Опубликуйте историю и получайте восторженные комплименты от друзей!
						</Div></b>
						<Icon56StoryOutline style={{ margin: "10% 0", color: "rgb(0, 140, 255)", width: "150px", height: "150px", display: "block", marginLeft: "auto", marginRight: "auto" }} />
						<Div>
							<Button stretched size="l" sizeY="regular" mode="primary" onClick={() => clickStory(1)}>{texts[2][0]}</Button><br/>
							<Button stretched size="l" sizeY="regular" mode="secondary" onClick={() => clickStory(2)}>{texts[2][1]}</Button>
						</Div>
					</Group> 
				</div>
				}
			</Panel>

			<Panel id="result">
				<Group style={{ overflowX: "scroll"}}>
					<br/>
					<img src={resultUrl} style={{ width: "43%", display: "block", marginLeft: "auto", marginRight: "auto" }} />
					{openTest == 1 && <Div style={{ textAlign: "center" }}>{textPublication.split(" ").slice(0,-4).join(" ")}</Div> }
					<Div style={{ marginRight: "10%", marginLeft: "10%" }}>
						<div style={{ marginBottom: "20px" }}>
							<Title level="2">Вам доступен новый образ, выберете его прямо сейчас!</Title>
						</div>
						<ButtonGroup mode="vertical" gap="m" stretched>
							<Button stretched size="l" sizeY="regular" mode="primary" onClick={() => { openVKPost(); }} >
								<b>Поделиться с друзьями</b>
							</Button>
							{countResults < 10 && <Button after={<Icon24VideoCircleOutline />} stretched size="l" sizeY="regular" mode="primary" onClick={() => { openAd(); }}><b>Выбрать новый образ</b></Button>}
						</ButtonGroup>
					</Div>
					<a href="https://vk.me/public224280594" target="_blank"><img src={imgPortrait} style={{ display: "block", margin: "0 auto", width: "65%" }}/></a>
				</Group>

				{snackbar}
			</Panel>
		</View>
		</Root>
	];
};

Home.propTypes = {
};

export default Home;
