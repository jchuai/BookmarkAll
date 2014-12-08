var bookmarkBarID = "1";
function formatDateNum(num){
	return num<10 ? '0'+num : num;
}
function getCurrentTime() {
	var now = new Date();
	var dd = now.getDate();
	dd = formatDateNum(dd);
	var mm = now.getMonth() + 1;
	mm = formatDateNum(mm);
	var yyyy = now.getFullYear();
	var min = now.getMinutes();
	min = formatDateNum(min);
	var sec = now.getSeconds();
	sec = formatDateNum(sec);
	var current = yyyy + '-' + mm + '-' + dd + ' ' + now.getHours() + ':' + min + ':' + sec;
	return current
}

function saveAllTabsTo(folderName){
	chrome.bookmarks.create({'parentId': bookmarkBarID, 'title': folderName },
		function(newFolder){
			chrome.tabs.query({}, function(tabs){
				for(var index in tabs){
					var tab = tabs[index];
					chrome.bookmarks.create({'parentId': newFolder.id, 
						'title': tab.title, 
						'url': tab.url});
				}
			})
		});
}

function updateView(folderName){
	var folder = document.getElementById('folder');
	folder.innerHTML = folderName;
	var saving = document.getElementById('saving');
	saving.style.display = "none";
	var savingDone = document.getElementById('savingDone');
	savingDone.style.display = "inline-block";
}

document.addEventListener('DOMContentLoaded', function(){
	var currentTime = getCurrentTime();
	saveAllTabsTo(currentTime);
	updateView(currentTime);
	console.log("All jobs done!")
});