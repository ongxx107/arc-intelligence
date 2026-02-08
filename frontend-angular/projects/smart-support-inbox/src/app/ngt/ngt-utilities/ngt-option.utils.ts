import { NgtNamedOptionGroup, NgtOption } from "./ngt-option.data";

/** Option type assert function as typeguard */
export function isNamedOptionGroup(option: NgtNamedOptionGroup | NgtOption): option is NgtNamedOptionGroup{
    return (option as NgtNamedOptionGroup).name !== undefined;
} 

function _filterOptionForString(value: string, option: NgtOption){
    return option?.label.toLowerCase().includes(value.toLowerCase());
}

/** Filters the option labels containing a value */
export function filterStringOptions(value: string, options: NgtOption[] | NgtNamedOptionGroup[]) {
  if (!value || !options || options.length < 1) return [];
  if (isNamedOptionGroup(options[0])){
    let filteredGroups: NgtNamedOptionGroup[] = [];
    (options as NgtNamedOptionGroup[]).forEach(
        group => filteredGroups.push( 
            {name: group.name, options: group.options.filter(option => _filterOptionForString(value, option)).slice()}
        )
    );
    return filteredGroups;
  } 
  return (options as NgtOption[]).filter(option => _filterOptionForString(value, option));                                               
};


export function getKeyFromOptions(value: string, options: NgtOption[] | NgtNamedOptionGroup[]){
    if(!value) return '';
    for ( let option of options){
        if(isNamedOptionGroup(option)) {
            for (let suboption of (option as NgtNamedOptionGroup).options){
                if (value === suboption.label) return suboption.key;
            }
        }else {
            const suboption = (option as NgtOption);
            if (value === suboption.label) return suboption.key;
        }
    }
    return 'unknown';
}

