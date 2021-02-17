class CustomSelect {
  constructor(selector) {
    this._$main = document.querySelector(selector);
    this._$trigger = this._$main.querySelector('[data-select="trigger"]');
    this._addEventListener();
  }

  _isShow() {
    //берем все классы his._$main и сравниваем есть ли среди них select_show
    return this._$main.classList.contains('select_show');
  }

  _changeItem(item) {
    //если клик был по не выбранному элементу
    if (!item.classList.contains('select__item_selected')) {
      const itemSelected = this._$main.querySelector('.select__item_selected');
      if (itemSelected) {
        //убераем активный класс у ранее выбранного элемента
        itemSelected.classList.remove('select__item_selected');
      }
      // устанавливаем активный класс новому элементу
      item.classList.add('select__item_selected');
    }
  }

  _eventHandler(e) {
    let $target = e.target;
    let type = $target.dataset.select;

    if (type === 'trigger') {
      this.toggle();
    }
    else if (type === 'item') {
      this._changeItem($target);
      this.hide();
    }
    else if (type === 'backdrop') {
      // закрываем селект, если кликнули вне его
      this.hide();
    }
  }

  _addEventListener() {
    // привяжем функцию _eventHandler к контексту this
    this._eventHand = this._eventHandler.bind(this);
    // добавим слушатель
    this._$main.addEventListener('click', this._eventHand);
  }

  show() {
    this._$main.classList.add('select_show');
  }
  hide() {
    this._$main.classList.remove('select_show');
  }
  toggle() {
    this._isShow() ? this.hide() : this.show();
  }
}

const select1 = new CustomSelect('#select-1');