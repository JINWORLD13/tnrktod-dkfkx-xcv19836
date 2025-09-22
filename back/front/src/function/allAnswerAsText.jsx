export const allAnswerAsText = JSXTextTagArr => {
    if (JSXTextTagArr === undefined || JSXTextTagArr === null) return;
    if (JSXTextTagArr?.[JSXTextTagArr?.length - 1] === null) JSXTextTagArr?.pop();
    const extractTextFromJSX = (element) => {
        if (typeof element === 'string' || typeof element === 'number') {
            return String(element);
        }
        if (Array.isArray(element)) {
            return element.map(extractTextFromJSX).join('');
        }
        if (element && typeof element === 'object' && element.props && element.props.children) {
            return extractTextFromJSX(element.props.children);
        }
        return '';
    };
    const safeJoin = (children, separator = '') => {
        if (Array.isArray(children)) {
            return children.map(extractTextFromJSX).join(separator);
        } else if (typeof children === 'string' || typeof children === 'number') {
            return String(children);
        } else if (children && typeof children === 'object' && children.props) {
            return extractTextFromJSX(children);
        }
        return '';
    };
    const processFirstElement = (elem) => {
        const questionTagArr = elem?.props?.children;
        if (!Array.isArray(questionTagArr)) {
            return extractTextFromJSX(elem?.props?.children);
        }
        const processQuestionTag = (questionTag) => {
            const childrenOfQuestionTag = Array.isArray(questionTag?.props?.children)
                ? safeJoin(questionTag?.props?.children)
                : questionTag?.props?.children || '';
            if (Array.isArray(childrenOfQuestionTag)) {
                return processQuestionChildren(childrenOfQuestionTag);
            } else if (typeof childrenOfQuestionTag === 'string') {
                return childrenOfQuestionTag + '\n';
            }
            return safeJoin(questionTag?.props?.children) + '\n';
        };
        const processQuestionChildren = (children) => {
            const filtered = children?.filter(elem => 
                elem !== null && elem !== undefined && elem !== ''
            );
            if (filtered.length === 1) {
                if (typeof filtered[0] === 'object') {
                    const grandChildren = filtered[0]?.props?.children;
                    return safeJoin(grandChildren) + '\n';
                }
                return safeJoin(filtered) + '\n';
            }
            const elem = filtered[1];
            if (typeof elem === 'object') {
                const childrenOfelem = elem?.props?.children;
                return filtered[0] + extractTextFromJSX(childrenOfelem) + '\n';
            }
            return safeJoin(filtered) + '\n';
        };
        const textContentArr = questionTagArr.map(processQuestionTag);
        return textContentArr.join('') + '\n';
    };
    const processArrayElement = (elem) => {
        if (elem?.length > 1) {
            return elem.map(e => 
                e?.props?.children
                    ?.map(x => safeJoin(x?.props?.children))
                    ?.join('\n')
            )?.join('\n\n');
        } else if (elem?.length === 1) {
            return elem[0]?.props?.children
                ?.map(child => safeJoin(child?.props?.children))
                ?.join('\n');
        }
        return '';
    };
    const processRegularElement = (elem) => {
        if (Array.isArray(elem?.props?.children)) {
            const textContent = elem.props.children
                .map(child => {
                    if (Array.isArray(child)) {
                        return processArrayElement(child);
                    }
                    return extractTextFromJSX(child?.props?.children);
                })
                .join('\n');
            return textContent + '\n';
        } else {
            const textContent = extractTextFromJSX(elem?.props?.children);
            return textContent + '\n';
        }
    };
    const processElement = (elem, index) => {
        if (index === 0) {
            return processFirstElement(elem);
        }
        return processRegularElement(elem);
    };
    const lines = JSXTextTagArr?.map(processElement);
    const result = lines?.join('');
    return result;
};
