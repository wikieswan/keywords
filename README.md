# keywords 

en: Split Keywords From String Text . 

zh: 根据关键字分隔文本，得到结构化的数据，完成高亮显示文本中关键字的需求。

When I wanner to dispaly highlight keywords in article on page, I donnot find a good tool for me to do this job. So I write this .

input:

	var str = 'xxABCxxBCDxxABCDExx'
 	var aKeyword = ['ABC','BCD','CDE'];

out:

	[{type: 0, text: "xx"},
	{type: 1, text: "ABC"},
	{type: 0, text: "xx"},
	{type: 1, text: "BCD"},
	{type: 0, text: "xx"},
	{type: 1, text: "ABCDE"}]

When I get a structure list of my article string, I can dispaly whatever on page.

## 中文说明

目的： 高亮显示一段文字里的部分关键字

具体需求：根据关键字搜索获得一段文字，关键字可能会有多个，文字显示的时候，需要根据关键字进行高亮。

看似简单的需求，其实有很多细节需要考虑，比如：关键字多个、关键字重叠等

具体做法可以参考 example/index.html 的例子。

我们得到一个结构化的 list，

	{
		type: 0, // 0 - 普通文本， 1 - 关键字文本
		text: "xx"， // 显示内容
	}

之后，根据这个结构化的数据，按照自己UI需求完成剩下的工作就好了。





