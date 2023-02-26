var ArrayNumber = {

  add: function (array) {

    array.push(length + 1);
    length++;
    maxElement = Math.max.apply(null, array);
  },

  remove: function(array) {
    var x = array.indexOf(maxElement);
    array.splice(x, 1);
    length--;
    maxElement = Math.max.apply(null, array);
  },

  shuffle: function(array) {
  for (var i = length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
  }
}

var Sort = {
  // 버블 정렬
  Bubble: async function (array) {
    var i, j, temp;
    for (i = 0; i < length; i++) {
      for (j = 0; j < length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
        await sleep(100);
        renewDisplay();
      }
    }
  },
  // 선택 정렬
  Selection: async function (array) {
    var i, j, x, target;
    for (i = 0; i < length; i++) {
      target = array[i];
      for (j = i + 1; j < length; j++) {
        if (target >= array[j]) {
          target = array[j]
        }
      }
      x = array.indexOf(target);
      array[x] = array[i];
      array[i] = target;
      
      await sleep(100);
      renewDisplay();
    }
  },
  // 삽입 정렬
  Insertion: async function (array) {
    var i, j, temp;
    for (i = 1; i < length + 1; i++) {
      for (j = i - 1; j > 0; j--) {
        if (array[j] >= array[j-1]) {
          break;
        }
        else {
          temp = array[j];
          array[j] = array[j - 1];
          array[j - 1] = temp;
        }
        await sleep(100);
        renewDisplay();
      }
    }
  }
}

// 클릭한 탭 하얀색으로 변경
function  activateSorterButton(sortertype) {
  var buttons = document.querySelectorAll('.sortertype');
  var i = 0;
  while (i < buttons.length) {
      buttons[i].style.backgroundColor = "#e9efe9";
      buttons[i].style.borderBottom = "3px solid #d5dbd5";
      i = i + 1;
    }
  sortertype.style.backgroundColor = "#ffffff";
  sortertype.style.borderBottom = "#ffffff";
}
  


// 그래프 생성
function setDisplay() {
  var screen = document.getElementById("screen");
  var screen_width = screen.offsetWidth;
  var bar_width = screen_width / (length*3);
  for (var i = 0; i < length; i++) {
    var bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.width = bar_width + "px";
    bar.style.height = (array[i]) * 400 / maxElement + "px";
    bar.style.backgroundColor = "#ff0000";
    if (i != length - 1) {
      bar.style.marginRight = (screen_width - 40 - (bar_width + 1) * length) / (length - 1) + "px";
    }
    screen.appendChild(bar);
  }
}

// 그래프 높이 업데이트
function renewDisplay() {
  var screen = document.getElementById("screen");
  var barlist = screen.querySelectorAll("div");
  // 화면에 있던 그래프 삭제
  barlist.forEach((div) => {
    div.remove();
  });
  // 그래프 새로 생성
  setDisplay();
}

// 초기 화면 설정
var array = [1, 2, 3, 4, 5];
var length = array.length;
var maxElement = Math.max.apply(null, array);
window.onload = function () { 
  setDisplay();
}
var currentSorter = Sort.Bubble(array);

// 동기지연 
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// 버튼 온클릭 설정
function button_numberRemove() {
  ArrayNumber.remove(array);
  renewDisplay();
}

function button_numberAdd() {
  ArrayNumber.add(array);
  renewDisplay();
}

function button_shuffle() {
  ArrayNumber.shuffle(array);
  renewDisplay();
}

function button_startSort() {
  currentSorter();
}

function activateSorter(sorter) {
  currentSorter() = sorter;
}

