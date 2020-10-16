import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  // transform(value: any, searchText?: any): any {
  //   if (!value) return [];
  //   if (!searchText) return value;
  //   searchText = searchText.toLowerCase();
  //   return value.filter((it) => {
  //     console.log(it);
  //     // if(it.values.title) {
  //       return it.title.toLowerCase().includes(searchText)
  //     // }
  //   });
  // }

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter((it) => {
      console.log(it)
      if (it["title"]) return it["title"].toLowerCase().includes(searchText);
    });
  }
}
