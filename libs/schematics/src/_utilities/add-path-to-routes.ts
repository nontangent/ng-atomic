import { Tree } from '@angular-devkit/schematics';
import { getSourceNodes } from '@nrwl/workspace/src/utils/ast-utils';
import ts from 'typescript';

const isVariableDeclaration = (n: ts.Node) => n.kind === ts.SyntaxKind.VariableDeclaration;
const isIdentifier = (n: ts.Node) => n.kind === ts.SyntaxKind.Identifier;
const isArrayLiteralExpression = (n: ts.Node) => n.kind === ts.SyntaxKind.ArrayLiteralExpression;
const matchText = (n: ts.Node, text: string) => n.getText() === text;
const hasMatchTextChild = (n: ts.Node, text: string) => {
	return n.getChildren().findIndex(c => (isIdentifier(c) && matchText(c, text))) !== -1;
};
const isRoutesVariableDeclaration = (n: ts.Node) =>  isVariableDeclaration(n) && hasMatchTextChild(n, 'routes')

export const addPathToRoutes = ({route, routingModulePath, removeOtherRoutes}: any) => (host: Tree) => {
	const src = ts.createSourceFile(
		routingModulePath,
		host.read(routingModulePath)!.toString('utf-8'),
		ts.ScriptTarget.Latest,
		true
	);

	const nodes = getSourceNodes(src);
	const routeNodes = nodes.filter(isRoutesVariableDeclaration).map((n: ts.Node) => {
		return n.getChildren().filter(isArrayLiteralExpression).reverse()[0];
	});

	if (routeNodes.length === 1) {
		const n = routeNodes[0] as ts.ArrayLiteralExpression;
		const recorder = host.beginUpdate(routingModulePath);
		const suffix = n.elements.length > 0 && !removeOtherRoutes ? ',' : '';
		recorder.insertRight(n.getStart() + 1, `${route}${suffix}`);
		host.commitUpdate(recorder);
	}		

	return host;
};